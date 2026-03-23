'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { PortableText } from '@portabletext/react'
import s from './ModuleValues.module.scss'
import type { ModuleValues as ModuleValuesType } from '@/sanity/types/home'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'

import 'swiper/css'

interface Props {
  data: ModuleValuesType
  locale?: string
}

export default function ModuleValues({ data, locale = 'en' }: Props) {
  const values = data.values ?? []
  const total = values.length
  const swiperRef = useRef<SwiperType | null>(null)
  const indexRef = useRef(0)
  const counterRef = useRef<HTMLParagraphElement>(null)

  const sectionTitle = getLocalizedText(data.sectionTitle, locale)

  function updateCounter(swiper: SwiperType) {
    indexRef.current = swiper.realIndex
    if (counterRef.current) {
      counterRef.current.textContent = `${String(swiper.realIndex + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`
    }
  }

  return (
    <section
      className={s.section}
      id={data.id}
    >
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div className={s.inner}>
        <button
          className={s.arrow}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous value"
          disabled={total <= 1}
        >
          <ArrowLeft />
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          loop={total > 1}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={updateCounter}
          className={s.swiper}
        >
          {values.map((value, i) => {
            const valueTitle = getLocalizedText(value?.title, locale)
            const valueBody = getLocalizedBody(value?.text, locale)
            return (
              <SwiperSlide key={value._key ?? i} className={s.slide}>
                {valueTitle && <p className={s.valueTitle}>{valueTitle}</p>}
                {valueBody.length > 0 && (
                  <div className={s.valueBody}>
                    <PortableText value={valueBody} />
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>

        <button
          className={s.arrow}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next value"
          disabled={total <= 1}
        >
          <ArrowRight />
        </button>
      </div>

      {total > 0 && (
        <p className={s.counter} ref={counterRef}>
          01/{String(total).padStart(2, '0')}
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
