// sanity/types/home.ts

export interface ImageSanity {
  caption?: string
  ref?: string
  imageUrl: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; right: number; bottom: number; left: number }
  metadata: { dimensions: { width: number; height: number } }
  filename: string
  alt?: string
}

export interface InternationalizedText {
  _key: string
  value: string
}

export interface PortableTextBlock {
  _type: string
  _key: string
  children?: { text: string; _type: string; marks?: string[] }[]
  style?: string
  markDefs?: unknown[]
}

export interface InternationalizedBody {
  _key: string
  value: PortableTextBlock[]
}

export interface HeroHome {
  image: ImageSanity & { alt: string }
}

export interface ModuleAbout {
  _type: 'module.about'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
  body?: InternationalizedBody[]
}

export interface TeamMemberData {
  name: string
  photo?: ImageSanity & { alt: string }
  role?: InternationalizedText[]
  bio?: InternationalizedBody[]
  linkedIn?: string
  email?: string
}

export interface ModuleTeam {
  _type: 'module.team'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
  members?: TeamMemberData[]
}

export interface ValueItem {
  _key?: string
  title?: InternationalizedText[]
  text?: InternationalizedBody[]
}

export interface ModuleValues {
  _type: 'module.values'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
  values?: ValueItem[]
}

export interface ServiceItem {
  _key?: string
  title?: InternationalizedText[]
  text?: InternationalizedBody[]
  image?: ImageSanity
}

export interface ModuleServices {
  _type: 'module.services'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
  services?: ServiceItem[]
}

export interface PostData {
  _id: string
  title?: InternationalizedText[]
  slug?: { current: string }
  coverImage?: ImageSanity & { alt: string }
  publishedAt?: string
  excerpt?: InternationalizedBody[]
}

export interface ModuleNews {
  _type: 'module.news'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
  posts?: PostData[]
}

export interface ModuleContact {
  _type: 'module.contact'
  _key: string
  sectionTitle?: InternationalizedText[]
  id?: string
}

export interface ContactInfo {
  contactEmails?: string[]
  contactPhones?: string[]
  address?: string
}

export type HomeModule =
  | ModuleAbout
  | ModuleTeam
  | ModuleValues
  | ModuleServices
  | ModuleNews
  | ModuleContact

export interface HomeData {
  hero?: HeroHome
  modules?: HomeModule[]
}
