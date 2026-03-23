import { UsersIcon } from '@sanity/icons'
import { StructureBuilder } from 'sanity/structure'

export default function teamMemberStructure(S: StructureBuilder) {
  return S.listItem()
    .title('Team Members')
    .icon(UsersIcon)
    .schemaType('teamMember')
    .child(S.documentTypeList('teamMember'))
}
