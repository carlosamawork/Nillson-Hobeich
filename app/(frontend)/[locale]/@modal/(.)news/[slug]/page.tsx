import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/sanity/queries/queries/post'
import PostModal from '@/components/PostModal'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export default async function NewsModalPage({ params }: Props) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return <PostModal post={post} locale={locale} asModal />
}
