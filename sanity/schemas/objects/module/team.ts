import {UsersIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.team',
  title: 'Team',
  type: 'object',
  icon: UsersIcon,
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
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle', members: 'members'},
    prepare(selection) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t: {_key: string}) => t._key === 'en')?.value
        : selection.title
      const count = selection.members?.length ?? 0
      return {subtitle: 'Team', title: titleEn || 'Team section', description: `${count} member(s)`}
    },
  },
})
