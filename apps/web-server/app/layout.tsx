import "./globals.css"

import * as React from "react";
import {getUser} from "@/lib/dal";
import {NextIntlClientProvider} from "next-intl";
import {Toaster} from "@/components/shadcn/ui/sonner";
import {AuthProvider} from "@/components/auth-context";
import {getLocale, getMessages} from "next-intl/server";
import {ThemeProvider} from "@/components/theme-provider";
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