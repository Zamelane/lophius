import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'

export type LocaleKeysType = keyof Languages<string>

export const localesSupported: LocaleKeysType[] = [
  'ru',
  'en',
  'zh',
  'ko',
  'es',
  'fr',
  'de',
  'fi'
]
export const defaultLocale: LocaleKeysType = 'ru'
