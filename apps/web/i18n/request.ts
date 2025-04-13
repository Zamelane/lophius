import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, localesSupported } from "./config";

export default getRequestConfig(async () => {
  // 1. Получаем URL из заголовков
  const headersList = await headers();
  const pathname = headersList.get('x-url')|| '';
  
  // 2. Извлекаем локаль из пути
  let localeFromPath = defaultLocale;
  const pathParts = (new URL(pathname)).pathname.split('/')
  if (pathParts.length > 1 && localesSupported.includes(pathParts[1])) {
    localeFromPath = pathParts[1];
  }

  return {
    locale: localeFromPath,
    messages: (await import(`./messages/${localeFromPath}.json`)).default
  };
});