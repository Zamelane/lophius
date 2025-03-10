import "./globals.css"

import * as React from "react";
import {getUser} from "@/lib/dal";
import {Toaster} from "@/components/ui/sonner";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import {AuthProvider} from "@/components/helps/auth-context";
import {ThemeProvider} from "@/components/helps/theme-provider";
import {User, LayoutProps, ContentResponse} from "@/interfaces";

export default async function MyApp({children}: LayoutProps) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const auth: ContentResponse<User> = {
    content: await getUser()
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