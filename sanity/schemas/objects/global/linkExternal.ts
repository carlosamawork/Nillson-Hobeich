import {EarthGlobeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  title: 'External Link',
  name: 'linkExternal',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    // Title
    {
      title: 'Title',
      name: 'title',
      type: 'internationalizedArrayString',
    },
    // URL
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Open in a new window
    {
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection: { title?: { _key: string; value: string }[]; url?: string }) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t) => t._key === 'en')?.value ?? selection.title[0]?.value
        : undefined
      return {
        title: titleEn || 'External link',
        subtitle: selection.url ? `→ ${selection.url}` : undefined,
      }
    },
  },
})
