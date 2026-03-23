import { groq } from 'next-sanity'
import { client } from '..'
import { seo } from '../fragments/seo'
import { image } from '../fragments/image'
import type { HomeData, ContactInfo } from '@/sanity/types/home'

export async function getContactInfo(): Promise<ContactInfo> {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      contactEmails,
      contactPhones,
      address
    }`,
    {},
    { next: { tags: ['settings'], revalidate: 60 } }
  )
}

export async function getHome(): Promise<HomeData> {
  return client.fetch(
    groq`*[_type == "home"][0]{
      hero{
        image{
          alt,
          ${image}
        }
      },
      modules[]{
        _type,
        _key,
        sectionTitle,
        id,
        ...select(
          _type == "module.about" => {
            body
          },
          _type == "module.team" => {
            "members": members[]->{
              name,
              photo{ alt, ${image} },
              role,
              bio,
              linkedIn,
              email
            }
          },
          _type == "module.values" => {
            values[]{ _key, title, text }
          },
          _type == "module.services" => {
            services[]{ _key, title, text, image{ ${image} } }
          },
          _type == "module.news" => {
            "posts": *[_type == "post"] | order(publishedAt desc)[0...6]{
              _id,
              title,
              slug,
              coverImage{ alt, ${image} },
              publishedAt,
              excerpt
            }
          },
          _type == "module.contact" => {
            sectionTitle,
            id
          }
        )
      }
    }`,
    {},
    { next: { tags: ['home'], revalidate: 60 } }
  )
}

export async function getHomeSEO() {
  return client.fetch(
    groq`*[_type == "home"][0]{
      seo{
        ${seo}
      }
    }`
  )
}
