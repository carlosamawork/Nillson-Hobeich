import { groq } from 'next-sanity'
import { client } from '..'
import { image } from '../fragments/image'

export interface PostFull {
  _id: string
  title?: { _key: string; value: string }[]
  slug?: { current: string }
  coverImage?: {
    imageUrl: string
    alt?: string
    ref?: string
    metadata: { dimensions: { width: number; height: number } }
    filename: string
  }
  publishedAt?: string
  body?: { _key: string; value: unknown[] }[]
  author?: {
    name: string
    role?: { _key: string; value: string }[]
  }
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      coverImage{ alt, ${image} },
      publishedAt,
      body,
      "author": author->{ name, role }
    }`,
    { slug },
    { next: { tags: ['post'], revalidate: 60 } }
  )
}

export async function getAllPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{ slug }`,
    {},
    { next: { tags: ['post'], revalidate: 60 } }
  )
}
