// sanity/types/objects/global/settings.ts

import { SEO } from '../seo';

export type NavLink = {
  _type: 'linkExternal' | 'linkInternal'
  title?: { _key: string; value: string }[]
  url?: string
  newWindow?: boolean
}

export type SettingsData = {
  headerLinks?: NavLink[]
  contactEmails?: string[]
  contactPhones?: string[]
  address?: string
  seo?: SEO
}
