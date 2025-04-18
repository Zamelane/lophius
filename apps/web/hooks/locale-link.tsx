'use client';

import NextIntlLink from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof NextIntlLink>) {
  const pathname = usePathname();
  const hrefString = href.toString();
  const pathLocale = pathname.split('/')[1];
  const locale = pathLocale || defaultLocale;

  let finalHref = hrefString;

  // Обработка относительных путей (начинающихся с ./ или без / в начале)
  if (hrefString.startsWith('./') || (!hrefString.startsWith('/') && hrefString.length > 0)) {
    // Получаем текущий путь без локали
    const basePath = pathLocale ? pathname.substring(pathLocale.length + 1) : pathname;
    // Удаляем ./ если есть и добавляем к базовому пути
    finalHref = basePath + hrefString.replace('./', '/');
    // Убедимся, что путь начинается с /
    if (!finalHref.startsWith('/')) {
      finalHref = '/' + finalHref;
    }
  }

  // Добавляем локаль только если это не абсолютный URL
  if (!finalHref.startsWith('http') && !finalHref.startsWith('/' + locale)) {
    finalHref = `/${locale}${finalHref}`;
  }

  return <NextIntlLink href={finalHref} {...props} />;
}