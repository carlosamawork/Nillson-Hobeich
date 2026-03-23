import {ComposeIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.news',
  title: 'News',
  type: 'object',
  icon: ComposeIcon,
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
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare(selection) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t: {_key: string}) => t._key === 'en')?.value
        : selection.title
      return {subtitle: 'News (auto — most recent posts)', title: titleEn || 'News section'}
    },
  },
})
