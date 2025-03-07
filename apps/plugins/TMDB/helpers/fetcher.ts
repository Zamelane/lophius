import { GetDnsAgent } from "../../../parser-server/src";
import { request } from "../../../parser-server/src";

export const fetchConfig = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDhmNGJkNmNjN2IyZWUwNGMxZWVkNmUzMmM1MmIzNCIsIm5iZiI6MTcxNjkwMTM4NS40NjUsInN1YiI6IjY2NTVkNjA5MTYyNDQwNzlkNzczZjk3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PatX-22_TBePhxyyfDuKpTG8cpooQ6DEKLGRfDFQnw4'
  },
  dispatcher: GetDnsAgent('9.9.9.9')
}

export const fetcher = async <T>(url: string): Promise<FetcherResponse<T>> => {
  try {
    const response = await request(
      url,
      fetchConfig
    )

    console.log(`Запрос к ${url}`)

    // TODO: сделать нормальное ограничение
    await Bun.sleep(1700)

    const data = await response.body.json() as T

    return {
      successful: true,
      data
    }
  } catch {
    return {
      successful: false
    }
  }
}

type FetcherResponse<T> = {
  successful: boolean
  data?: T
}