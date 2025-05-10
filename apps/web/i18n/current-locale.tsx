'use server'

import {
  type LocaleKeysType,
  defaultLocale,
  localesSupported
} from '@/i18n/config'
import { headers } from 'next/headers'

export async function getCurrentLocale() {
  let localeFromPath = defaultLocale

  try {
    // 1. Получаем URL из заголовков
    const headersList = await headers()
    const pathname = headersList.get('x-url') || ''

    // 2. Извлекаем локаль из пути
    const pathParts = new URL(pathname).pathname.split('/')
    if (
      pathParts.length > 1 &&
      localesSupported.includes(pathParts[1] as LocaleKeysType)
    ) {
      localeFromPath = pathParts[1] as LocaleKeysType
    }
  } catch (err) {
    console.log(`Error detecting the language along the way, more: ${err}`)
  }

  return localeFromPath
}
