'use server'

import { getCurrentLocale } from './current-locale'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  const locale = await getCurrentLocale()
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
