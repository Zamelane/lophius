import './globals.css'

import { AuthProvider } from '@/src/shared/providers/auth-context'
import { ThemeProvider } from '@/src/shared/providers/theme-provider'
import { Toaster } from '@/src/shared/ui/shadcn/sonner'
import type { ContentResponse, LayoutProps, UserInfo } from '@/src/shared/types'
import { getCurrentUser } from '@/src/shared/lib/dal'
import type { Metadata } from 'next'
import { AppProgressBar } from 'next-app-progress-bar'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  applicationName: 'Lophius',
  metadataBase: process.env.PUBLIC_URL
    ? new URL(process.env.PUBLIC_URL)
    : undefined,
  title: {
    default: 'Home',
    template: '%s | Lophius'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  keywords: [
    'Lophius',
    'Media',
    'Collections',
    'films',
    'serials',
    'comics',
    'music',
    'books'
  ]
}

export default async function MyApp({ children }: LayoutProps) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  const auth: ContentResponse<UserInfo> = {
    content: await getCurrentUser()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
      </head>
      <body>
        <AppProgressBar
          shadow={false}
          showSpinner={false}
          color='hsl(var(--foreground))'
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='system'
            disableTransitionOnChange
          >
            <AuthProvider initialData={auth}>{children}</AuthProvider>
          </ThemeProvider>
          <Toaster richColors closeButton duration={8000} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
