import { HomeIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

const TITLE = 'Home'

export default defineType({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: [
    { default: true, name: 'editorial', title: 'Editorial' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'hero.home', group: 'editorial' }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      group: 'editorial',
      of: [
        { type: 'module.about' },
        { type: 'module.team' },
        { type: 'module.values' },
        { type: 'module.services' },
        { type: 'module.news' },
        { type: 'module.contact' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo.home', group: 'seo' }),
  ],
  preview: {
    prepare() {
      return { subtitle: 'Index', title: TITLE }
    },
  },
})
