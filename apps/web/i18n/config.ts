import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types"

export type locale = keyof Languages<string>

export const localesSupported: locale[] = ['ru', 'en', 'zh', 'ko', 'es', 'fr', 'de', 'fi']
export const defaultLocale: locale = 'ru'
