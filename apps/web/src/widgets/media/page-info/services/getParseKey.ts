'use server'
import { getCurrentLocale } from '@/src/shared/i18n/current-locale'
import { treaty } from '@elysiajs/eden'
import { WorkerAppHttp } from 'worker/src/server-app'

export async function getParseKey(
  mediaId: number
) {
  const locale = await getCurrentLocale()
  const client = treaty<WorkerAppHttp>(process.env.WS_LOCAL_URL!)

  const { data, error } = await client.mediaParse.post({
    userId: 1,
    mediaId,
    locale
  })

  if (error || !data) {
    console.log(error)
    return null
  }

  return data.key
}
