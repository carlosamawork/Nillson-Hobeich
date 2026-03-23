import { ComposeIcon } from '@sanity/icons'
import { StructureBuilder } from 'sanity/structure'

export default function postStructure(S: StructureBuilder) {
  return S.listItem()
    .title('Posts')
    .icon(ComposeIcon)
    .schemaType('post')
    .child(S.documentTypeList('post'))
}
