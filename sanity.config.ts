import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/desk'

import { visionTool } from '@sanity/vision'
import myLogo from './sanity/icons/defaultLogo'

import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { languageFilter } from '@sanity/language-filter'
import { LANGUAGES, DEFAULT_LANGUAGE_ID } from './sanity/i18n/languages'


const devOnlyPlugins = [visionTool({ name: 'groq-developer', title: 'GROQ Debugger' })]


export default defineConfig({
  name: 'nillson-hobeich',
  title: 'Nilsson Hobeich Admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  basePath: "/admin",
  icon: myLogo,

  plugins: [
    structureTool({ structure, title: 'Website Content' }),
    imageHotspotArrayPlugin(),
    media(),
    internationalizedArray({
      languages: LANGUAGES,
      defaultLanguages: [DEFAULT_LANGUAGE_ID],
      fieldTypes: ['string', 'text', 'body'],
    }),
    languageFilter({
      supportedLanguages: LANGUAGES,
      defaultLanguages: [DEFAULT_LANGUAGE_ID],
    }),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
})