import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";
import LoginForm from "@/components/forms/login-form";


export async function generateMetadata(props: MetadataProps) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'LoginPage'
  })

  return {
    title: t('title')
  }
}

export default function LoginPage() {
  return <LoginForm/>
}
