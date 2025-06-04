'use server'
import { getCurrentLocale } from '@/src/shared/i18n/current-locale'
import { treaty } from '@elysiajs/eden'
import type { MediaType } from 'database/schemas/media_types'
import type { WorkerAppHttp } from '../../../../../worker/src/server-app'
import type { ObjectType } from '../../media/search/types'

export async function getSearchKey(
  query: string,
  mediaType: MediaType,
  objectType: ObjectType
) {
  const locale = await getCurrentLocale()
  const client = treaty<WorkerAppHttp>(process.env.WS_LOCAL_URL!)

  const { data, error } = await client.search.post({
    userId: 1,
    data: {
      query,
      mediaType,
      objectType,
      locale
    }
  })

  if (error) {
    return null
  }

  return data.key
}
