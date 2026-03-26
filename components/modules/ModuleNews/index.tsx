'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import s from './ModuleNews.module.scss'
import type { ModuleNews as ModuleNewsType } from '@/sanity/types/home'
import { getLocalizedText } from '@/utils/localeHelper'
import LazyImage from '@/components/Common/LazyImage'

interface Props {
  data: ModuleNewsType
  locale?: string
}

const titleVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit:  { opacity: 0 },
}

const imageVariants = {
  enter: { opacity: 0.5 },
  center: { opacity: 1 },
  exit:  { opacity: 0.5 },
}

export default function ModuleNews({ data, locale = 'en' }: Props) {
  const sectionTitle = getLocalizedText(data.sectionTitle, locale)
  const posts = data.posts ?? []
  const total = posts.length
  const [current, setCurrent] = useState(0)

  if (total === 0) return null

  const prevIdx = (current - 1 + total) % total
  const nextIdx = (current + 1) % total

  const activePost = posts[current]
  const prevPost  = posts[prevIdx]
  const nextPost  = posts[nextIdx]

  const activeTitle = getLocalizedText(activePost.title, locale)

  return (
    <section className={s.section} id={data.id}>
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div className={s.titleWrap}>
        <AnimatePresence>
          <motion.p
            key={current}
            className={s.postTitle}
            variants={titleVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeTitle}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className={s.carousel}>
        {/* Prev */}
        <button
          className={s.side}
          onClick={() => setCurrent(prevIdx)}
          aria-label="Noticia anterior"
        >
          {prevPost.coverImage?.imageUrl && (
            <div className={s.imageWrap}>
              <LazyImage
                src={prevPost.coverImage.imageUrl}
                alt={getLocalizedText(prevPost.title, locale)}
                width={prevPost.coverImage.metadata?.dimensions?.width ?? 832}
                height={prevPost.coverImage.metadata?.dimensions?.height ?? 502}
                blurDataURL={prevPost.coverImage.ref}
                filename={prevPost.coverImage.filename}
                objectFit="cover"
                fill
                sizes="22vw"
                defaultInView={false}
                ignoreRichResults
              />
            </div>
          )}
        </button>

        {/* Active */}
        <div className={s.activeWrap}>
          <AnimatePresence>
            <motion.div
              key={`active-${current}`}
              className={s.active}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activePost.coverImage?.imageUrl && (
                <div className={s.imageWrap}>
                  <LazyImage
                    src={activePost.coverImage.imageUrl}
                    alt={activePost.coverImage.alt ?? activeTitle}
                    width={activePost.coverImage.metadata?.dimensions?.width ?? 832}
                    height={activePost.coverImage.metadata?.dimensions?.height ?? 502}
                    blurDataURL={activePost.coverImage.ref}
                    filename={activePost.coverImage.filename}
                    objectFit="cover"
                    fill
                    sizes="(max-width: 768px) 90vw, 54vw"
                    defaultInView={false}
                    ignoreRichResults
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          className={s.side}
          onClick={() => setCurrent(nextIdx)}
          aria-label="Siguiente noticia"
        >
          {nextPost.coverImage?.imageUrl && (
            <div className={s.imageWrap}>
              <LazyImage
                src={nextPost.coverImage.imageUrl}
                alt={getLocalizedText(nextPost.title, locale)}
                width={nextPost.coverImage.metadata?.dimensions?.width ?? 832}
                height={nextPost.coverImage.metadata?.dimensions?.height ?? 502}
                blurDataURL={nextPost.coverImage.ref}
                filename={nextPost.coverImage.filename}
                objectFit="cover"
                fill
                sizes="22vw"
                defaultInView={false}
                ignoreRichResults
              />
            </div>
          )}
        </button>
      </div>

      <div className={s.footer}>
        <p className={s.counter}>
          {String(current + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </p>
        {activePost.slug?.current && (
          <p>
            <Link
              href={`/${locale}/news/${activePost.slug.current}`}
              className={s.readMore}
            >
              LEER MÁS
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
