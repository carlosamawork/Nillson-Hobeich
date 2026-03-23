import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import s from './ModuleTeam.module.scss'
import type { ModuleTeam as ModuleTeamType } from '@/sanity/types/home'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'
import LazyImage from '@/components/Common/LazyImage'

interface Props {
  data: ModuleTeamType
  locale?: string
}

export default function ModuleTeam({ data, locale = 'en' }: Props) {
  const members = data.members ?? []

  return (
    <section
      className={s.section}
      id={data.id}
    >
      {members.map((member) => {
        const bio = getLocalizedBody(member.bio, locale)
        return (
          <article key={member.name} className={s.member}>
            {member.photo?.imageUrl && (
              <div className={s.photo}>
                <LazyImage
                  src={member.photo.imageUrl}
                  alt={member.photo.alt ?? member.name}
                  width={member.photo.metadata?.dimensions?.width ?? 600}
                  height={member.photo.metadata?.dimensions?.height ?? 800}
                  blurDataURL={member.photo.ref}
                  filename={member.photo.filename}
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  defaultInView={false}
                />
              </div>
            )}
            <div className={s.content}>
              <h2 className={s.name}>{member.name}</h2>
              {bio.length > 0 && (
                <div className={s.bio}>
                  <PortableText value={bio} />
                </div>
              )}
              <div className={s.links}>
                {member.linkedIn && (
                  <Link
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.link}
                  >
                    LINKEDIN
                  </Link>
                )}
                {member.linkedIn && member.email && (
                  <span className={s.separator}>/</span>
                )}
                {member.email && (
                  <Link href={`mailto:${member.email}`} className={s.link}>
                    EMAIL
                  </Link>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
