import { PUBLIC_URL } from "@/env/env.server";
import { defaultLocale, locale, localesSupported } from "@/i18n/config";
import { MetadataRoute } from "next";

function languageHref(href: string = '', lang: string = defaultLocale) {
  return `${PUBLIC_URL}${lang ? `/${lang}` : ''}${href ? `/${href}` : ''}`
}

function alternativeHrefs(href: string = '') {
  let alternatives: {
    [key in locale]?: string
  } = {}

  for (const locale of localesSupported) {
    if (locale === defaultLocale)
      continue
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