import { MediaType } from "database/schemas/media_types"

export type List = {
  id: number
  order?: number
  title: string
  i18nTitle?: string | null
  comment?: string
  mediaType?: MediaType
  isHidden: boolean
  isSystem: boolean
}