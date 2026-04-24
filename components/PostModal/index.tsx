'use client'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import s from './PostModal.module.scss'
import type { PostFull } from '@/sanity/queries/queries/post'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'
import { portableBlockComponents } from '@/utils/portableText/portableText'
import { WebContext } from '@/context/webContext'

interface Props {
  post: PostFull
  locale?: string
  asModal?: boolean
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="1" y1="1" x2="21" y2="21" stroke="currentColor" strokeWidth="1"/>
      <line x1="21" y1="1" x2="1" y2="21" stroke="currentColor" strokeWidth="1"/>
    </svg>
  )
}

const NEWS_LABEL: Record<string, string> = {
  es: 'Noticias',
  ca: 'Notícies',
  sv: 'Nyheter',
  en: 'News',
}

const BY_LABEL: Record<string, string> = {
  es: 'Por',
  ca: 'Per',
  sv: 'Av',
  en: 'By',
}

const CLOSE_LABEL: Record<string, string> = {
  es: 'Cerrar',
  ca: 'Tancar',
  sv: 'Stäng',
  en: 'Close',
}

export default function PostModal({ post, locale = 'en', asModal = false }: Props) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)
  const { modalLocale, setModalLocale } = useContext(WebContext)
  const effectiveLocale = modalLocale || locale

  function handleClose() {
    document.body.style.overflow = ''
    setModalLocale(null)
    setIsClosing(true)
  }

  const title = getLocalizedText(post.title, effectiveLocale)
  const body = getLocalizedBody(post.body as Parameters<typeof getLocalizedBody>[0], effectiveLocale)
  const authorRole = getLocalizedText(post.author?.role, effectiveLocale)

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(effectiveLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!asModal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [asModal])

  const content = (
    <article className={s.article}>
      <p className={s.section}>{NEWS_LABEL[effectiveLocale] ?? NEWS_LABEL.en}</p>
      <h1 className={s.title}>{title}</h1>
      {(post.author?.name || publishedDate) && (
        <p className={s.byline}>
          {post.author?.name && (
            <span>
              {BY_LABEL[effectiveLocale] ?? BY_LABEL.en} {post.author.name}
              {authorRole && `, ${authorRole}`}
            </span>
          )}
          {publishedDate && <span className={s.date}>{publishedDate}</span>}
        </p>
      )}
      {body.length > 0 && (
        <div className={s.body}>
          <PortableText value={body as Parameters<typeof PortableText>[0]['value']} components={portableBlockComponents()} />
        </div>
      )}
    </article>
  )

  if (!asModal) return <div className={s.page}>{content}</div>

  return (
    <motion.div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ pointerEvents: isClosing ? 'none' : undefined }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: isClosing ? 0.3 : 0.35, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isClosing) {
          document.body.style.overflow = ''
          router.back()
        }
      }}
    >
      <button
        className={s.close}
        onClick={handleClose}
        aria-label={CLOSE_LABEL[effectiveLocale] ?? CLOSE_LABEL.en}
      >
        <CloseIcon />
      </button>
      <div className={s.scroll}>{content}</div>
    </motion.div>
  )
}
