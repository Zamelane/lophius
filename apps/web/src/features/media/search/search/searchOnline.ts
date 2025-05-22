import { MediaType, ObjectType } from "."

type Props = {
  search: string
  objectType: ObjectType
  mediaType?: MediaType
} | {
  objectType: 'media'
  mediaType: MediaType
}

export function SearchOnline({
  search,
  objectType,
  mediaType
}: Props) {
  
}