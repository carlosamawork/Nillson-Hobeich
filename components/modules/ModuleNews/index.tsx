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
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center:               { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

// Estado visual por rol. El stage ocupa ~49% del ancho total,
// por lo que ±80% reproduce la posición de las columnas laterales originales.
const ROLE_STATE = {
  prev:   { x: '-80%', scale: 0.38, zIndex: 0, opacity: 1 },
  active: { x:   '0%', scale: 1,    zIndex: 1, opacity: 1 },
  next:   { x:  '80%', scale: 0.38, zIndex: 0, opacity: 1 },
}

const TRANSITION = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } as const

const DRAG_THRESHOLD = 80

const READ_MORE_LABELS: Record<string, string> = {
  es: 'LEER MÁS',
  ca: 'LLEGIR MÉS',
  sv: 'LÄS MER',
  en: 'READ MORE',
}

export default function ModuleNews({ data, locale = 'en' }: Props) {
  const sectionTitle = getLocalizedText(data.sectionTitle, locale)
  const posts = data.posts ?? []
  const total = posts.length
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  if (total === 0) return null

  const prevIdx = (current - 1 + total) % total
  const nextIdx = (current + 1) % total

  const activePost = posts[current]
  const activeTitle = getLocalizedText(activePost.title, locale)

  function goTo(idx: number, dir: number) {
    if (idx === current) return
    setDirection(dir)
    setCurrent(idx)
  }

  // Tres posts visibles, deduplicados para cuando total <= 2
  const seen = new Set<number>()
  const visible = [
    { idx: prevIdx, role: 'prev'   as const },
    { idx: current, role: 'active' as const },
    { idx: nextIdx, role: 'next'   as const },
  ].filter(({ idx }) => !seen.has(idx) && Boolean(seen.add(idx)))

  return (
    <section className={s.section} id={data.id}>
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div className={s.titleWrap}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.p
            key={current}
            className={s.postTitle}
            custom={direction}
            variants={titleVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {activeTitle}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Stage: todas las imágenes se posicionan absolutas aquí y
          animan entre estados. El section con overflow:hidden hace el clip. */}
      <motion.div
        className={s.stage}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        style={{ cursor: 'grab' }}
        whileDrag={{ cursor: 'grabbing' }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -DRAG_THRESHOLD) goTo(nextIdx, 1)
          else if (info.offset.x > DRAG_THRESHOLD) goTo(prevIdx, -1)
        }}
      >
        <AnimatePresence initial={false}>
          {visible.map(({ idx, role }) => {
            const post    = posts[idx]
            const isActive = role === 'active'
            const state   = ROLE_STATE[role]
            const title   = getLocalizedText(post.title, locale)

            return (
              <motion.div
                key={idx}
                className={s.stageItem}
                animate={state}
                initial={{ ...state, opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={TRANSITION}
                onClick={!isActive ? () => goTo(idx, role === 'next' ? 1 : -1) : undefined}
                style={!isActive ? { cursor: 'pointer' } : undefined}
              >
                {post.coverImage?.imageUrl && (
                  <div className={s.imageWrap}>
                    <LazyImage
                      src={post.coverImage.imageUrl}
                      alt={post.coverImage.alt ?? title}
                      width={post.coverImage.metadata?.dimensions?.width ?? 832}
                      height={post.coverImage.metadata?.dimensions?.height ?? 502}
                      blurDataURL={post.coverImage.ref}
                      filename={post.coverImage.filename}
                      objectFit="cover"
                      fill
                      sizes={isActive ? '(max-width: 768px) 90vw, 50vw' : '22vw'}
                      defaultInView={false}
                      ignoreRichResults
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

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
              {READ_MORE_LABELS[locale] ?? READ_MORE_LABELS.en}
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
