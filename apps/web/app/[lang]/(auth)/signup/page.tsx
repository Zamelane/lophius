import SignupForm from '@/components/forms/signup-form'
import type { MetadataProps } from '@/interfaces'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(props: MetadataProps) {
  const t = await getTranslations({
    namespace: 'SignupPage',
    locale: (await props.params).locale
  })

  return {
    title: t('title')
  }
}

export default function SignupPage() {
  return <SignupForm />
}
