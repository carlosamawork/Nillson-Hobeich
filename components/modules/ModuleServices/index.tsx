'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import s from './ModuleServices.module.scss'
import type { ModuleServices as ModuleServicesType } from '@/sanity/types/home'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'
import LazyImage from '@/components/Common/LazyImage'

interface Props {
  data: ModuleServicesType
  locale?: string
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.08, ease: 'easeOut' as const },
  }),
  hover: {},
}

const overlayVariants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  hover:    { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

export default function ModuleServices({ data, locale = 'en' }: Props) {
  const sectionTitle = getLocalizedText(data.sectionTitle, locale)
  const services = data.services ?? []

  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    points: [] as { x: number; t: number }[],
    rafId: 0,
  })

  function onMouseDown(e: React.MouseEvent) {
    cancelAnimationFrame(drag.current.rafId)
    const el = trackRef.current
    if (!el) return
    drag.current.active = true
    drag.current.startX = e.pageX
    drag.current.scrollLeft = el.scrollLeft
    drag.current.points = [{ x: e.pageX, t: performance.now() }]
    el.style.cursor = 'grabbing'
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!drag.current.active) return
    const el = trackRef.current
    if (!el) return
    e.preventDefault()

    const now = performance.now()
    drag.current.points.push({ x: e.pageX, t: now })
    drag.current.points = drag.current.points.filter((p) => now - p.t < 80)

    el.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX)
  }

  function onMouseUp() {
    if (!drag.current.active) return
    drag.current.active = false
    const el = trackRef.current
    if (el) el.style.cursor = ''

    const points = drag.current.points
    if (points.length < 2) return

    const first = points[0]
    const last = points[points.length - 1]
    const dt = last.t - first.t
    if (dt === 0) return

    let vel = ((last.x - first.x) / dt) * 16
    let lastTs = performance.now()

    function momentum(now: number) {
      const track = trackRef.current
      if (!track || Math.abs(vel) < 0.3) return
      const elapsed = now - lastTs
      lastTs = now
      track.scrollLeft -= vel * (elapsed / 16)
      vel *= 0.94
      drag.current.rafId = requestAnimationFrame(momentum)
    }
    drag.current.rafId = requestAnimationFrame(momentum)
  }

  return (
    <section className={s.section} id={data.id}>
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div
        ref={trackRef}
        className={s.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {services.map((service, i) => {
          const title = getLocalizedText(service.title, locale)
          const body = getLocalizedBody(service.text, locale)
          return (
            <motion.article
              key={service._key ?? i}
              className={s.card}
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className={s.imageWrap}>
                {service.image?.imageUrl && (
                  <LazyImage
                    src={service.image.imageUrl}
                    alt={title}
                    width={service.image.metadata?.dimensions?.width ?? 367}
                    height={service.image.metadata?.dimensions?.height ?? 449}
                    blurDataURL={service.image.ref}
                    filename={service.image.filename}
                    objectFit="cover"
                    fill
                    sizes="(max-width: 768px) 80vw, 367px"
                    defaultInView={false}
                  />
                )}
                {body.length > 0 && (
                  <motion.div
                    className={s.overlay}
                    aria-hidden="true"
                    variants={overlayVariants}
                  >
                    <div className={s.overlayText}>
                      <PortableText value={body} />
                    </div>
                  </motion.div>
                )}
              </div>
              <p className={s.counter}>
                {String(i + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}
              </p>
              {title && <p className={s.title}>{title}</p>}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
