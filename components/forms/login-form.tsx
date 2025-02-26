'use client'

import {toast} from "sonner";
import Link from "next/link";
import {login} from "@/actions/login";
import {useTranslations} from "next-intl";
import {Label} from "@/components/shadcn/ui/label";
import React, {useState, useActionState} from "react";
import {InputCustom} from "@/components/shadcn/ui/input-custom";
import LoadingButton from "@/components/shadcn/ui/loading-button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shadcn/ui/popover";
import {Card, CardTitle, CardHeader, CardContent, CardDescription} from "@/components/shadcn/ui/card";

export default function LoginForm() {
  const t = useTranslations('LoginPage')
  const t_api = useTranslations('Api')
  const [state, action, pending] = useActionState(login, undefined)
  const [getEmail, setEmail] = useState("")

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  React.useEffect(() => {
    if (!state)
      return;

    if (state?.message)
      toast(t_api(state?.message))
  }, [state, t_api]);

  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('welcome_title')}</CardTitle>
          <CardDescription>{t('welcome_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('email_field_title')}</Label>
                  <InputCustom
                    required
                    id="email"
                    type="text"
                    value={getEmail}
                    placeholder="m@example.com"
                    onChange={handleChangeEmail}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t('password_field_title')}</Label>
                    <div className="ml-auto">
                      <Popover>
                        <PopoverTrigger>
                          <a className="text-sm underline-offset-4 hover:underline">
                            {t('forgot_password')}
                          </a>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Label>Извините, не сделал :/</Label>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <InputCustom
                    required
                    id="password"
                    type="password"
                    placeholder="•••"
                  />
                </div>
                <LoadingButton
                  type="submit"
                  text={t('login')}
                  isLoading={pending}
                />
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