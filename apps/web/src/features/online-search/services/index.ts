'use server'
import { treaty } from '@elysiajs/eden'
import { WorkerAppHttp } from '../../../../../worker/src/server-app';
import { MediaType } from 'database/schemas/media_types';
import { getCurrentLocale } from '@/src/shared/i18n/current-locale';
import { ObjectType } from '../../media/search/types';

export async function getSearchKey(query: string, mediaType: MediaType, objectType: ObjectType) {
  const locale = await getCurrentLocale()
  const client = treaty<WorkerAppHttp>("http://localhost:3001")

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