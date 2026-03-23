import '../../../styles/main.scss'

import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import WebProvider from '../../../context/webContext'
import HeaderComponent from '../../../components/Common/HeaderComponent'
import { getHeader } from '@/sanity/queries/common/header'
import type { HeaderData } from '@/sanity/types'

import CookieConsent from '@/components/Common/CookieConsent/CookieConsent'
import ConsentGate from '@/components/Common/Analytics/consentGate'
import Analytics from '@/components/Common/Analytics/google'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

function RawHTML({ html }: { html: string }) {
  return <div className="credits" dangerouslySetInnerHTML={{ __html: html }} />
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const header: HeaderData | undefined = await getHeader().catch(() => undefined)

  return (
    <html lang={locale}>
      <body>
        <RawHTML
          html="<!-- ----------------------------------------------------- -->
        <!-- Nilsson Hobeich (2026) by Magatzem Studio (https://magatzem.studio) -->
        <!-- ----------------------------------------------------- -->"
        />
        <NextIntlClientProvider>
          <WebProvider>
            <HeaderComponent data={header} locale={locale} />

            {children}

            {/* <CookieConsent /> */}
            {process.env.NODE_ENV === 'production' && (
              <>
                <ConsentGate category="analytics">
                  <Analytics />
                </ConsentGate>
              </>
            )}
          </WebProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
