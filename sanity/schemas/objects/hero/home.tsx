import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero.home',
  title: 'Home Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
