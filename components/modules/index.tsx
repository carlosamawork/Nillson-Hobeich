import type { HomeModule, ContactInfo } from '@/sanity/types/home'
import ModuleAbout from './ModuleAbout'
import ModuleTeam from './ModuleTeam'
import ModuleValues from './ModuleValues'
import ModuleServices from './ModuleServices'
import ModuleNews from './ModuleNews'
import ModuleContact from './ModuleContact'

interface Props {
  modules?: HomeModule[]
  contactInfo?: ContactInfo
  locale?: string
}

export default function Modules({ modules, contactInfo, locale }: Props) {
  if (!modules?.length) return null

  return (
    <>
      {modules.map((mod) => {
        const key = mod._key

        switch (mod._type) {
          case 'module.about':
            return <ModuleAbout key={key} data={mod} locale={locale} />
          case 'module.team':
            return <ModuleTeam key={key} data={mod} locale={locale} />
          case 'module.values':
            return <ModuleValues key={key} data={mod} locale={locale} />
          case 'module.services':
            return <ModuleServices key={key} data={mod} locale={locale} />
          case 'module.news':
            return <ModuleNews key={key} data={mod} locale={locale} />
          case 'module.contact':
            return <ModuleContact key={key} data={mod} contactInfo={contactInfo} locale={locale} />
          default:
            return null
        }
      })}
    </>
  )
}
