'use client'

import { type MediaType, mediaTypes } from 'database/schemas/media_types'
import NextIntlLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { defaultLocale } from '../i18n/config'

type Props = React.ComponentProps<typeof NextIntlLink> & {
  ignoreMediaType?: boolean
}

export function LocaleLink({ href, ignoreMediaType, ...props }: Props) {
  const pathname = usePathname()
  const hrefString = href.toString()

  const finalHref = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const locale = segments[0] || defaultLocale
    const possibleMediaType = segments[1]
    const hasMediaType = mediaTypes.includes(possibleMediaType as MediaType)
    const mediaType = hasMediaType ? possibleMediaType : undefined

    let resolvedHref = hrefString

    // Обработка относительных путей
    if (
      hrefString.startsWith('./') ||
      (!hrefString.startsWith('/') && !hrefString.startsWith('http'))
    ) {
      const basePath = hasMediaType
        ? segments.slice(2).join('/')
        : segments.slice(1).join('/')
      resolvedHref = `/${basePath}/${hrefString.replace(/^\.?\//, '')}`
    }

    // Убедимся, что путь начинается с /
    if (!resolvedHref.startsWith('/')) {
      resolvedHref = `/${resolvedHref}`
    }

    // Проверка: есть ли mediaType уже в финальном href
    const hrefSegments = resolvedHref.split('/').filter(Boolean)
    const hrefHasLocale = hrefSegments[0] === locale
    const hrefHasMediaType =
      hrefHasLocale &&
      hrefSegments.length > 1 &&
      mediaTypes.includes(hrefSegments[1] as MediaType)

    // Вставим mediaType в путь, если он был в текущем, но его ещё нет в href
    if (mediaType && !hrefHasMediaType && !ignoreMediaType) {
      const insertPosition = hrefHasLocale ? 1 : 0
      hrefSegments.splice(insertPosition, 0, mediaType)
      resolvedHref = `/${hrefSegments.join('/')}`
    }

    // Добавим локаль, если её нет
    if (!resolvedHref.startsWith(`/${locale}`)) {
      resolvedHref = `/${locale}${resolvedHref.startsWith('/') ? '' : '/'}${resolvedHref}`
    }

    return resolvedHref
  }, [pathname, hrefString])

  return <NextIntlLink href={finalHref} {...props} />
}
