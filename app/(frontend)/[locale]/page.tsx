import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getDefaultSEO } from '@/sanity/queries/common/defaultSEO'
import { getHome, getHomeSEO, getContactInfo } from '@/sanity/queries/queries/home'
import HomeIntro from '@/components/HomeIntro'
import Modules from '@/components/modules'
import {
  BASE_IMAGE_HEIGHT,
  BASE_IMAGE_URL,
  BASE_IMAGE_WIDTH,
  BASE_URL,
  buildUrl,
  getFavicons,
  siteDescription,
  siteTitle,
} from '@/utils/seoHelper'

export const revalidate = 60

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const page = await getHomeSEO()
  const defaultSEO = await getDefaultSEO()

  if (!page) {
    return {
      metadataBase: BASE_URL,
      title: defaultSEO?.title || siteTitle,
      description: defaultSEO?.description || siteDescription,
      robots: {
        index: false,
        follow: true,
        nocache: false,
        googleBot: {
          index: false,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: BASE_URL.origin,
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, buildUrl(`/${l}/`)])
        ),
      },
    }
  }

  return {
    metadataBase: BASE_URL,
    title: `${page.seo?.title || siteTitle}`,
    description: page.seo?.description || siteDescription,
    generator: 'Next.js',
    applicationName: siteTitle,
    openGraph: {
      title: `${page.seo?.title || siteTitle}`,
      description: page.seo?.description || siteDescription,
      url: buildUrl(`/${locale}/`),
      siteName: siteTitle,
      images: [
        {
          url: page.seo?.image?.imageUrl || BASE_IMAGE_URL,
          width: page.seo?.image?.metadata?.dimensions?.width || BASE_IMAGE_WIDTH,
          height: page.seo?.image?.metadata?.dimensions?.height || BASE_IMAGE_HEIGHT,
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: getFavicons(),
    alternates: {
      canonical: buildUrl(`/${locale}/`),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, buildUrl(`/${l}/`)])
      ),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.seo?.title || siteTitle}`,
      description: page.seo?.description || siteDescription,
      images: [page.seo?.image?.imageUrl || BASE_IMAGE_URL],
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const [home, contactInfo] = await Promise.all([getHome(), getContactInfo()])

  return (
    <main>
      <HomeIntro heroImage={home?.hero?.image} />
      <Modules modules={home?.modules} contactInfo={contactInfo} locale={locale} />
    </main>
  )
}
