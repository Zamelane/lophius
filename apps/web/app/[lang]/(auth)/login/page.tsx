import LoginForm from '@/components/forms/login-form'
import type { MetadataProps } from '@/interfaces'
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
