'use client';

import NextIntlLink from 'next/link';
import {usePathname} from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof NextIntlLink>) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || defaultLocale;
  
  return <NextIntlLink href={`/${locale}${href}`} {...props} />;
}