'use client'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import s from './HeaderComponent.module.scss'
import type { HeaderData } from '@/sanity/types'
import { getLocalizedText } from '@/utils/localeHelper'
import { WebContext } from '@/context/webContext'

type Props = {
  data?: HeaderData
  locale?: string
}

export default function HeaderComponent({ data, locale = 'en' }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { setModalLocale } = useContext(WebContext)
  const t = useTranslations('header')

  const links = data?.headerLinks ?? []
  const isModalOpen = pathname.startsWith('/news/')

  function switchLocale(next: string) {
    const currentPath = window.location.pathname
    const onNewsPage = currentPath.includes('/news/')
    if (onNewsPage) {
      setModalLocale(next)
      const pathWithoutLocale = '/' + currentPath.split('/').slice(2).join('/')
      window.history.replaceState({}, '', `/${next}${pathWithoutLocale}`)
    } else {
      router.replace(pathname, { locale: next, scroll: false })
    }
    setMenuOpen(false)
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, url: string) {
    setMenuOpen(false)
    if (isModalOpen) {
      e.preventDefault()
      router.back()
      if (url?.startsWith('#')) {
        setTimeout(() => {
          document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      }
    }
  }

  return (
    <>
      {/* Layer 1 — blend layer (nav + right). mix-blend-mode: difference on the whole element */}
      <header className={s.header}>
        <nav className={s.nav} aria-label="Main navigation">
          {links.map((link, i) => {
            const label = getLocalizedText(link.title, locale)
            const url = link.url ?? '#'
            return (
              <a
                key={i}
                href={url}
                target={link.newWindow ? '_blank' : undefined}
                rel={link.newWindow ? 'noopener noreferrer' : undefined}
                className={s.navLink}
                onClick={(e) => handleNavClick(e, url)}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className={s.right}>
          <a
            href="https://www.mnprogramweb.net/"
            className={s.clientAccess}
            target='_blank'
          >
            {t('clientAccess')}
          </a>
          <div className={s.locales}>
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`${s.localeBtn} ${loc === locale ? s.localeBtnActive : ''}`}
                aria-label={`Switch to ${loc.toUpperCase()}`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          className={s.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`${s.bar} ${menuOpen ? s.barOpen1 : ''}`} />
          <span className={`${s.bar} ${menuOpen ? s.barOpen2 : ''}`} />
        </button>
      </header>

      {/* Layer 2 — logo. Separate fixed element, NO mix-blend-mode → always red */}
      <Link href={`/${locale}`} className={s.logoWrap} aria-label="Nilsson Hobeich — Inicio">
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.53667 0L8.07977 4.74919H13.0734L9.03346 7.68435L10.5766 12.4335L6.53667 9.49838L2.49676 12.4335L4.03987 7.68435L-3.29018e-05 4.74919H4.99356L6.53667 0Z" fill="#C30000"/>
        </svg>
      </Link>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={s.mobileMenu} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav className={s.mobileNav}>
            {links.map((link, i) => {
              const label = getLocalizedText(link.title, locale)
              const url = link.url ?? '#'
              return (
                <a
                  key={i}
                  href={url}
                  target={link.newWindow ? '_blank' : undefined}
                  rel={link.newWindow ? 'noopener noreferrer' : undefined}
                  className={s.mobileNavLink}
                  onClick={(e) => handleNavClick(e, url)}
                >
                  {label}
                </a>
              )
            })}
          </nav>
          <a
            href="https://www.mnprogramweb.net/"
            className={s.mobileClientAccess}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {t('clientAccess')}
          </a>
          <div className={s.mobileLocales}>
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`${s.localeBtn} ${loc === locale ? s.localeBtnActive : ''}`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
