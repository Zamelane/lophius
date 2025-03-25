import { allFieldsDefined } from "@/interfaces"
import { movieDetails } from "../client"

export async function LoadMovieDetailed({
  id,
  token
}: {
  id: number
  token: string
}) {
  const { data, error } = await movieDetails({
    auth: token,
    path: {
      movie_id: id
    }
  })

  if (error || !data || !allFieldsDefined(data))
    throw new Error(`Не удалось загрузить детальную информацию о фильме: ${JSON.stringify(error)}`)

  return data
}