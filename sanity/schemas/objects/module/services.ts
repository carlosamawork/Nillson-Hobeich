import {TagIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import React from 'react'

const serviceItem = {
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}],
    },
    {name: 'title', title: 'Title', type: 'internationalizedArrayString'},
    {name: 'text', title: 'Text', type: 'internationalizedArrayBody'},
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare(selection: {title?: {_key: string; value: string}[]; media?: React.ComponentType}) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t) => t._key === 'en')?.value
        : undefined
      return {title: titleEn || 'Service', media: selection.media}
    },
  },
}

export default defineType({
  name: 'module.services',
  title: 'Services',
  type: 'object',
  icon: TagIcon,
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
    defineField({name: 'services', title: 'Services', type: 'array', of: [serviceItem]}),
  ],
  preview: {
    select: {title: 'sectionTitle', services: 'services'},
    prepare(selection) {
      const titleEn = Array.isArray(selection.title)
        ? selection.title.find((t: {_key: string}) => t._key === 'en')?.value
        : selection.title
      const count = selection.services?.length ?? 0
      return {
        title: titleEn || 'Services section',
        subtitle: `Services · ${count} item${count !== 1 ? 's' : ''}`,
        media: TagIcon,
      }
    },
  },
})
