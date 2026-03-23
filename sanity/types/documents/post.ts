import type { InternationalizedString } from '@/sanity/i18n/types'

export type Post = {
  _type: 'post'
  _id: string
  title?: InternationalizedString
  slug?: InternationalizedString
  publishedAt: string
  author?: { _ref: string; _type: 'reference' }
  coverImage?: {
    imageUrl: string
    alt?: string
  }
  excerpt?: InternationalizedString
  body?: InternationalizedString
}
