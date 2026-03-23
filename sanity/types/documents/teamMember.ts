import type { InternationalizedString } from '@/sanity/i18n/types'

export type TeamMember = {
  _type: 'teamMember'
  _id: string
  name: string
  photo?: { imageUrl: string; alt?: string }
  role?: InternationalizedString
  bio?: InternationalizedString
  linkedIn?: string
  email?: string
}
