import {LinkIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {PAGE_REFERENCES} from '../../../constants'

export default defineField({
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: LinkIcon,
  fields: [
    // Title
    {
      title: 'Title',
      name: 'title',
      type: 'internationalizedArrayString',
    },
    // Reference
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      validation: (Rule) => Rule.required(),
      to: PAGE_REFERENCES,
    },
  ],
  preview: {
    select: {
      title: 'title',
      reference: 'reference',
      referenceTitle: 'reference.title',
    },
    prepare(selection: { title?: { _key: string; value: string }[]; reference?: { _id: string }; referenceTitle?: string }) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t) => t._key === 'en')?.value ?? selection.title[0]?.value
        : undefined
      const subtitle = selection.reference
        ? `→ ${selection.referenceTitle || selection.reference._id}`
        : '(Nonexistent document reference)'
      return {
        title: titleEn || 'Internal link',
        subtitle,
      }
    },
  },
})
