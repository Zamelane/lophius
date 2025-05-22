import LoginForm from '@/src/features/auth/ui/login-form'
import type { MetadataProps } from '@/src/shared/types'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(props: MetadataProps) {
  const t = await getTranslations({
    namespace: 'LoginPage',
    locale: (await props.params).locale
  })

  return {
    title: t('title')
  }
}

export default function LoginPage() {
  return <LoginForm />
}
