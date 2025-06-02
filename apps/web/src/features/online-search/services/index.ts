'use server'
import { treaty } from '@elysiajs/eden'
import { WorkerAppHttp } from '../../../../../worker/src/server-app';
import { MediaType } from 'database/schemas/media_types';
import { getCurrentLocale } from '@/src/shared/i18n/current-locale';

export async function getSearchKey(query: string, mediaType: MediaType) {
  const locale = await getCurrentLocale()
  const client = treaty<WorkerAppHttp>("http://localhost:3001")

  const { data, error } = await client.search.post({
    userId: 1,
    data: {
      query,
      mediaType,
      locale
    }
  })

  if (error) {
    return null
  }

  return data.key
}