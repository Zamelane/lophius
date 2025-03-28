import { allFieldsDefined } from "@/interfaces"
import { movieImages } from "../client"

export async function LoadImages({
  id,
  token
}: {
  id: number
  token: string
}) {
  const { data, error } = await movieImages({
    auth: token,
    path: {
      movie_id: id
    }
  })

  if (error || !data || !allFieldsDefined(data))
    throw new Error(`Не удалось загрузить детальную информацию о фильме: ${JSON.stringify(error)}`)

  return data
}