import {StarIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

// Embedded object — no se exporta ni registra por separado
const valueItem = {
  name: 'valueItem',
  title: 'Value',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'internationalizedArrayString'},
    {name: 'text', title: 'Text', type: 'internationalizedArrayBody'},
  ],
  preview: {
    select: {title: 'title', text: 'text'},
    prepare(selection: {
      title?: {_key: string; value: string}[]
      text?: {_key: string; value: {children?: {text: string}[]}[]}[]
    }) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t) => t._key === 'en')?.value
        : undefined

      const bodyEn = Array.isArray(selection.text)
        ? selection.text.find((t) => t._key === 'en')?.value
        : undefined
      const firstText = bodyEn?.[0]?.children?.map((c) => c.text).join('') ?? ''

      return {title: titleEn || 'Value', subtitle: firstText}
    },
  },
}

export default defineType({
  name: 'module.values',
  title: 'Values',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier for this section, used for anchor links. Use lowercase, hyphens only.',
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: 'lowercase-hyphenated',
          invert: false,
        }),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [valueItem],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle', values: 'values'},
    prepare(selection) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t: {_key: string}) => t._key === 'en')?.value
        : selection.title
      const count = selection.values?.length ?? 0
      return {
        title: titleEn || 'Values section',
        subtitle: `Values · ${count} item${count !== 1 ? 's' : ''}`,
        media: StarIcon,
      }
    },
  },
})
