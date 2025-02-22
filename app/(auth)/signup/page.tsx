import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";
import SignupForm from "@/components/forms/signup-form";

export async function generateMetadata(props: MetadataProps) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'SignupPage'
  })

  return {
    title: t('title')
  }
}

export default function SignupPage() {
  return <SignupForm/>
}
