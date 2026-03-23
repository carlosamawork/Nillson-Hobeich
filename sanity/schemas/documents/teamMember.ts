import { UserIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  groups: [
    { default: true, name: 'editorial', title: 'Editorial' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required(), group: 'editorial' }),
    defineField({
      name: 'photo', title: 'Photo', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() })],
      group: 'editorial',
    }),
    defineField({ name: 'role', title: 'Role', type: 'internationalizedArrayString', group: 'editorial' }),
    defineField({ name: 'bio', title: 'Bio', type: 'internationalizedArrayBody', group: 'editorial' }),
    defineField({ name: 'linkedIn', title: 'LinkedIn URL', type: 'url', group: 'editorial' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'editorial' }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
    prepare(selection) {
      return { title: selection.title || 'Sin nombre', media: selection.media, subtitle: 'Team Member' }
    },
  },
})
