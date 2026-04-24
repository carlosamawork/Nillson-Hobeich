'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import s from './ModuleValues.module.scss'
import type { ModuleValues as ModuleValuesType } from '@/sanity/types/home'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'

interface Props {
  data: ModuleValuesType
  locale?: string
}

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit:  { opacity: 0 },
}

export default function ModuleValues({ data, locale = 'en' }: Props) {
  const values = data.values ?? []
  const total = values.length
  const [index, setIndex] = useState(0)

  const sectionTitle = getLocalizedText(data.sectionTitle, locale)

  function prev() {
    if (total <= 1) return
    setIndex((i) => (i - 1 + total) % total)
  }

  function next() {
    if (total <= 1) return
    setIndex((i) => (i + 1) % total)
  }

  const value = values[index]
  const valueTitle = value ? getLocalizedText(value.title, locale) : null
  const valueBody = value ? getLocalizedBody(value.text, locale) : []

  return (
    <section className={s.section} id={data.id}>
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div className={s.inner}>
        <button
          className={s.arrow}
          onClick={prev}
          aria-label="Previous value"
          disabled={total <= 1}
        >
          <ArrowLeft />
        </button>

        <div className={s.swiper}>
          <AnimatePresence>
            <motion.div
              key={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const threshold = 50
                if (info.offset.x < -threshold) next()
                else if (info.offset.x > threshold) prev()
              }}
              className={s.slide}
            >
              {valueTitle && <p className={s.valueTitle}>{valueTitle}</p>}
              {valueBody.length > 0 && (
                <div className={s.valueBody}>
                  <PortableText value={valueBody} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className={s.arrow}
          onClick={next}
          aria-label="Next value"
          disabled={total <= 1}
        >
          <ArrowRight />
        </button>
      </div>

      {total > 0 && (
        <p className={s.counter}>
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </p>
      )}
    </section>
  )
}

function ArrowLeft() {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
      <path d="M20 2L2 20L20 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
      <path d="M2 2L20 20L2 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
