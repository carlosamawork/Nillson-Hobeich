import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPostBySlug, getAllPostSlugs } from '@/sanity/queries/queries/post'
import { routing } from '@/i18n/routing'
import PostModal from '@/components/PostModal'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs().catch(() => [])
  return routing.locales.flatMap((locale) =>
    posts
      .filter((p) => p.slug?.current)
      .map((p) => ({ locale, slug: p.slug.current }))
  )
}

export default async function NewsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return <PostModal post={post} locale={locale} />
}
