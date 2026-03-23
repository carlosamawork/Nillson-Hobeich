// utils/seoHelper.ts

// Determine the base URL depending on the environment
export const BASE_URL = new URL(
  process.env.NODE_ENV === 'production'
    ? 'https://www.nilssonhobeich.com'
    : 'http://localhost:3000'
)

// Helper function for consistent URL creation
export const buildUrl = (path = '/') => new URL(path, BASE_URL).toString()

// Global site metadata
export const siteTitle = 'Nilsson & Hobeich'
export const siteDescription =
  'Nilsson & Hobeich — International law firm based in Barcelona with offices in Spain and Sweden. Specialists in dispute resolution, business law, tax law, property law, insolvency, and human rights.'

// Social & canonical links
export const canonicalHome = buildUrl('/')
export const canonicalAbout = buildUrl('/about')

// Images & favicons
export const BASE_IMAGE_URL = buildUrl('/images/nilssonhobeich_share_1200x800.jpg')
export const BASE_IMAGE_WIDTH = 1200
export const BASE_IMAGE_HEIGHT = 800

export const FAVICON_CLEAR = buildUrl('/favicon/favicon_clear.png')
export const FAVICON_DARK = buildUrl('/favicon/favicon_dark.png')

export function getFavicons() {
  return {
    icon: [
      {media: '(prefers-color-scheme: light)', url: FAVICON_CLEAR, href: FAVICON_CLEAR},
      {media: '(prefers-color-scheme: dark)', url: FAVICON_DARK, href: FAVICON_DARK},
    ],
    shortcut: FAVICON_CLEAR,
    apple: FAVICON_CLEAR,
    other: {rel: 'apple-touch-icon-precomposed', url: FAVICON_CLEAR},
  }
}

export function formatSlug(slug: string) {
  if (!slug) return ''
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
