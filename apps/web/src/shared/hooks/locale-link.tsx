'use client'

import { MediaType, mediaTypes } from 'database/schemas/media_types'
import { defaultLocale } from '../i18n/config'
import NextIntlLink from 'next/link'
import { usePathname } from 'next/navigation'

export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof NextIntlLink>) {
  const pathname = usePathname()
  const hrefString = href.toString()

  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0] || defaultLocale
  const possibleMediaType = segments[1]
  const hasMediaType = mediaTypes.includes(possibleMediaType as MediaType)
  const mediaType = hasMediaType ? possibleMediaType : undefined

  // Обработка относительных путей
  let finalHref = hrefString
  if (
    hrefString.startsWith('./') ||
    (!hrefString.startsWith('/') && !hrefString.startsWith('http'))
  ) {
    const basePath = hasMediaType
      ? segments.slice(2).join('/')
      : segments.slice(1).join('/')
    finalHref = `/${basePath}/${hrefString.replace(/^\.?\//, '')}`
  }

  // Убедимся, что путь начинается с /
  if (!finalHref.startsWith('/')) {
    finalHref = `/${finalHref}`
  }

  // Проверка: есть ли mediaType уже в финальном href
  const hrefSegments = finalHref.split('/').filter(Boolean)
  const hrefHasLocale = hrefSegments[0] === locale
  const hrefHasMediaType =
    hrefHasLocale && hrefSegments.length > 1 && mediaTypes.includes(hrefSegments[1] as MediaType)

  // Вставим mediaType в путь, если он был в текущем, но его ещё нет в href
  if (mediaType && !hrefHasMediaType) {
    const insertPosition = hrefHasLocale ? 1 : 0
    hrefSegments.splice(insertPosition, 0, mediaType)
    finalHref = '/' + hrefSegments.join('/')
  }

  // Добавим локаль, если её нет
  if (!finalHref.startsWith(`/${locale}`)) {
    finalHref = `/${locale}${finalHref.startsWith('/') ? '' : '/'}${finalHref}`
  }

  return <NextIntlLink href={finalHref} {...props} />
}
