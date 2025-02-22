import {useTranslations} from "next-intl";
import {MetadataProps} from "@/interfaces";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {getTranslations} from "next-intl/server";
import InputLimit from "@/components/ui/input-limit";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

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
                  <Label htmlFor="login">{t('login_field_title')}</Label>
                  <Input
                    required
                    id="login"
                    type="text"
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
                  <Input required id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                  {t('login')}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t('dont_have_account')}{" "}
                <a href="#" className="underline underline-offset-4">
                  {t('sign_up')}
                </a>
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
