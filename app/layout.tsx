import "./globals.css"

import * as React from "react";
import {LayoutProps} from "@/interfaces";
import {Toaster} from "@/components/ui/sonner";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import {ThemeProvider} from "@/components/theme-provider";

export default async function MyApp({children}: LayoutProps) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    <body>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster/>
      </NextIntlClientProvider>
    </body>
    </html>
  )
}