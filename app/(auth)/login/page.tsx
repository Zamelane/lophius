import Link from "next/link";
import {useTranslations} from "next-intl";
import {MetadataProps} from "@/interfaces";
import { Label } from "@/components/shadcn/ui/label"
import {getTranslations} from "next-intl/server";
import {InputCustom} from "@/components/shadcn/ui/input-custom";
import LoadingButton from "@/components/shadcn/ui/loading-button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/shadcn/ui/card"

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
  'use client'
  const t = useTranslations('LoginPage')

  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('welcome_title')}</CardTitle>
          <CardDescription>{t('welcome_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('email_field_title')}</Label>
                  <InputCustom
                    required
                    id="email"
                    type="text"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t('password_field_title')}</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t('forgot_password')}
                    </a>
                  </div>
                  <InputCustom
                    required
                    id="password"
                    type="password"
                    placeholder="•••"
                  />
                </div>
                <LoadingButton type="submit" text={t('login')}/>
              </div>
              <div className="text-center text-sm">
                {t('dont_have_account')}{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  {t('sign_up')}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        {t('by_clicking_continue')} <a href="#">{t('terms_of_service')}</a>{" "}
        {t('and')} <a href="#">{t('privacy_policy')}</a>.
      </div>
    </div>
  )
}
