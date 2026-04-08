'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import s from './HomeIntro.module.scss'
import type { ImageSanity } from '@/sanity/types/home'

interface HomeIntroProps {
  heroImage?: ImageSanity & { alt: string }
}

// Module-level flag: cleared on hard reload, persists across soft navigations
let introHasPlayed = false

export default function HomeIntro({ heroImage }: HomeIntroProps) {
  const [starVisible, setStarVisible] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(introHasPlayed)

  useEffect(() => {
    if (introHasPlayed) return

    const t1 = setTimeout(() => setStarVisible(true), 800)
    const t2 = setTimeout(() => setLogoVisible(true), 1400)
    const t3 = setTimeout(() => setFadeOut(true), 2800)
    const t4 = setTimeout(() => {
      introHasPlayed = true
      setHidden(true)
    }, 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`${s.intro} ${fadeOut ? s.fadeOut : ''}`} aria-hidden="true">
      {heroImage?.imageUrl ? (
        <Image
          src={heroImage.imageUrl}
          alt=""
          fill
          sizes="100vw"
          priority
          className={s.bg}
          style={{ objectFit: 'cover' }}
        />
      ) : null}

      <div className={s.logoWrap}>
        <span className={`${s.star} ${starVisible ? s.visible : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M10.183 0L12.5869 7.39831L20.3659 7.39831L14.0725 11.9707L16.4764 19.369L10.183 14.7966L3.88963 19.369L6.29349 11.9707L0.000108719 7.39831L7.77915 7.39831L10.183 0Z" fill="#C30000"/>
          </svg>
        </span>
        <span className={`${s.logo} ${logoVisible ? s.visible : ''}`}>
          <Image
            src="/logo.svg"
            alt="Nilsson Hobeich"
            width={219}
            height={28}
            priority
          />
        </span>
      </div>
    </div>
  )
}
