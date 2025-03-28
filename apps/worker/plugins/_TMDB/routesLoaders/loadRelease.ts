import { allFieldsDefined } from "@/interfaces"
import { movieImages, movieReleaseDates } from "../client"

export async function LoadReleaseDates({
  id,
  token
}: {
  id: number
  token: string
}) {
  const { data, error } = await movieReleaseDates({
    auth: token,
    path: {
      movie_id: id
    }
  })

  if (error || !data || !allFieldsDefined(data))
    throw new Error(`Не удалось загрузить детальную информацию о фильме: ${JSON.stringify(error)}`)

  return data
}