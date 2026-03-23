import { PortableText } from '@portabletext/react'
import s from './ModuleAbout.module.scss'
import type { ModuleAbout as ModuleAboutType } from '@/sanity/types/home'
import { getLocalizedText, getLocalizedBody } from '@/utils/localeHelper'

interface Props {
  data: ModuleAboutType
  locale?: string
}

export default function ModuleAbout({ data, locale = 'en' }: Props) {
  const title = getLocalizedText(data.sectionTitle, locale)
  const body = getLocalizedBody(data.body, locale)

  return (
    <section
      className={s.section}
      id={data.id}
    >
      {title && <p className={s.label}>{title}</p>}
      {body.length > 0 && (
        <div className={s.body}>
          <PortableText value={body} />
        </div>
      )}
      <div className={s.divider} aria-hidden="true" />
    </section>
  )
}
