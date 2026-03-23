import { CogIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'header',
      title: 'Header',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Menu
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerSettings',
      group: 'header',
    }),
    // Contact
    defineField({
      name: 'contactEmails',
      title: 'Contact Emails',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'contact',
    }),
    defineField({
      name: 'contactPhones',
      title: 'Contact Phones',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'contact',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
