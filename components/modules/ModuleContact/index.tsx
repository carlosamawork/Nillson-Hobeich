import Link from 'next/link'
import s from './ModuleContact.module.scss'
import type { ModuleContact as ModuleContactType, ContactInfo } from '@/sanity/types/home'
import { getLocalizedText } from '@/utils/localeHelper'

interface Props {
  data: ModuleContactType
  contactInfo?: ContactInfo
  locale?: string
}

export default function ModuleContact({ data, contactInfo, locale = 'en' }: Props) {
  const sectionTitle = getLocalizedText(data.sectionTitle, locale)
  const emails = contactInfo?.contactEmails ?? []
  const phones = contactInfo?.contactPhones ?? []
  const address = contactInfo?.address

  return (
    <section
      className={s.section}
      id={data.id}
    >
      {sectionTitle && <p className={s.label}>{sectionTitle}</p>}

      <div className={s.items}>
        {emails.length > 0 && (
          <div className={s.item}>
            <p className={s.itemLabel}>Email</p>
            <div className={s.itemContent}>
              {emails.map((email) => (
                <Link key={email} href={`mailto:${email}`} className={s.value}>
                  {email}
                </Link>
              ))}
            </div>
          </div>
        )}

        {emails.length > 0 && phones.length > 0 && (
          <div className={s.divider} aria-hidden="true" />
        )}

        {phones.length > 0 && (
          <div className={s.item}>
            <p className={s.itemLabel}>Teléfono</p>
            <div className={s.itemContent}>
              {phones.map((phone) => (
                <Link key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className={s.value}>
                  {phone}
                </Link>
              ))}
            </div>
          </div>
        )}

        {phones.length > 0 && address && (
          <div className={s.divider} aria-hidden="true" />
        )}

        {address && (
          <div className={s.item}>
            <p className={s.itemLabel}>Dirección</p>
            <div className={s.itemContent}>
              <p className={s.value}>{address}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
