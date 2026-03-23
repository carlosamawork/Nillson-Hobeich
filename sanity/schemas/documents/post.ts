import {DocumentIcon} from '@sanity/icons'
import {defineType, defineField, SanityDocument} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {default: true, name: 'editorial', title: 'Editorial'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'editorial',
      description: 'URL-friendly identifier per language. Use lowercase, hyphens only.',
      options: {
        source: (doc: SanityDocument) => {
          const title = doc.title as { _key: string; value: string }[] | undefined
          return title?.find((t) => t._key === 'en')?.value ?? ''
        },
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'teamMember'}],
      group: 'editorial',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'internationalizedArrayBody',
      group: 'editorial',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'internationalizedArrayBody',
      group: 'editorial',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', date: 'publishedAt'},
    prepare(selection) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t: {_key: string}) => t._key === 'en')?.value
        : selection.title
      return {title: titleEn || 'Sin título', media: selection.media, subtitle: 'Post'}
    },
  },
})
