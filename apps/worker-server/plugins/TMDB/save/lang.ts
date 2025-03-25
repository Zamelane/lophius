import { LanguageManager } from 'web-server/managers'
import { configurationLanguages } from '../client'
import { rateLimiter } from '../helps'
import { db } from '@/db'

export async function checkExistOrCreateLangByISO(iso_639_1: string, token: string) {
  const lang = await LanguageManager.getOneByISO_639_1(iso_639_1)

  if (lang)
    return
  
  let english_name
  const { error, data } = await rateLimiter.callWithRateLimit(
    async () => configurationLanguages({ auth: token })
  )

  if(!data) {
    throw new Error(`Не удалось запросить конфигурацию языка: ${JSON.stringify(error)}`)
  }

  for (const langItem of data) {
    if (langItem.iso_639_1 === iso_639_1 && langItem.english_name) {
      english_name = langItem.english_name
      break
    }
  }

  if (!english_name)
    throw new Error(`Не удалось извлечь английское именование для языка`)

  db.transaction(async (tx) => {
    await LanguageManager.create({
      english_name,
      iso_639_1,
      native_name: null,
      tx
    })
  })

  return
}