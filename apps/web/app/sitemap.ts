import { PUBLIC_URL } from '@/env/env.server'
import {
  type LocaleKeysType,
  defaultLocale,
  localesSupported
} from '@/i18n/config'
import type { MetadataRoute } from 'next'

function languageHref(href = '', lang: string = defaultLocale) {
  return `${PUBLIC_URL}${lang ? `/${lang}` : ''}${href ? `/${href}` : ''}`
}

function alternativeHrefs(href = '') {
  const alternatives: {
    [key in LocaleKeysType]?: string
  } = {}

  for (const locale of localesSupported) {
    if (locale === defaultLocale) continue
    alternatives[locale] = languageHref(href, locale)
  }

  return alternatives
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: languageHref(),
      lastModified: new Date(),
      alternates: {
        languages: alternativeHrefs('')
      }
    }
  ]
}
