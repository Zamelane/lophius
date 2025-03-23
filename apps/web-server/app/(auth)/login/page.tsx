import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";
import LoginForm from "@/components/forms/login-form";


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
  return <LoginForm/>
}
