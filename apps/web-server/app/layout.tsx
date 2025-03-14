import "./globals.css"

import * as React from "react";
import { Metadata } from "next";
import {getCurrentUser} from "@/lib/dal";
import {Toaster} from "@/components/ui/sonner";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import {AuthProvider} from "@/components/helps/auth-context";
import {ThemeProvider} from "@/components/helps/theme-provider";
import {LayoutProps, CurrentUserInfo, ContentResponse} from "@/interfaces";

export const metadata: Metadata = {
  applicationName: 'Lophius',
  title: {
    default: 'Home',
    template: '%s | Lophius'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  keywords: ['Lophius', 'Media', 'Collections', 'films', 'serials', 'comics', 'music', 'books']
}

export default async function MyApp({children}: LayoutProps) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const auth: ContentResponse<CurrentUserInfo> = {
    content: await getCurrentUser()
  }

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
            <AuthProvider initialData={auth}>
              {children}
            </AuthProvider>
          </ThemeProvider>
          <Toaster richColors
                   closeButton
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}