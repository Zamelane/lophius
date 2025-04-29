'use client'

import { login } from '@/actions/server/login'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { InputCustom } from '@/components/ui/input-custom'
import { Label } from '@/components/ui/label'
import LoadingButton from '@/components/ui/loading-button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { LocaleLink } from '@/hooks/locale-link'
import { useTranslations } from 'next-intl'
import { redirect } from 'next/navigation'
import React, { useState, useActionState } from 'react'
import { toast } from 'sonner'

import { setAuth } from '../helps/auth-context'

export default function LoginForm() {
  const t = useTranslations('LoginPage')
  const t_api = useTranslations('Api')
  const [state, action, pending] = useActionState(login, undefined)
  const [getEmail, setEmail] = useState('')
  const [getPassword, setPassword] = useState('')

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  React.useEffect(() => {
    if (!state) return

    console.log(state)

    if (state.success && state.content) {
      setAuth(state)
      redirect('/')
    }

    if (state?.errors && Object.keys(state.errors).length) {
      for (const key of Object.keys(state.errors))
        if (state.errors[key]?.length)
          for (const message of state.errors[key]) toast.error(t_api(message))
    } else if (state?.message) {
      toast.error(t_api(state.message))
    }
  }, [state, t_api])

  return (
    <div className='flex flex-col gap-6 max-w-sm'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{t('welcome_title')}</CardTitle>
          <CardDescription>{t('welcome_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>{t('email_field_title')}</Label>
                  <InputCustom
                    required
                    id='email'
                    name='email'
                    type='email'
                    value={getEmail}
                    placeholder='m@example.com'
                    onChange={handleChangeEmail}
                    className={state?.message ? 'border-red-500' : ''}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>
                      {t('password_field_title')}
                    </Label>
                    <div className='ml-auto'>
                      <Popover>
                        <PopoverTrigger>
                          <p className='text-sm underline-offset-4 hover:underline'>
                            {t('forgot_password')}
                          </p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Label>Извините, не сделал :/</Label>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <InputCustom
                    required
                    id='password'
                    name='password'
                    type='password'
                    placeholder='•••'
                    value={getPassword}
                    onChange={handleChangePassword}
                    className={state?.message ? 'border-red-500' : ''}
                  />
                </div>
                <LoadingButton
                  type='submit'
                  text={t('login')}
                  isLoading={pending}
                />
              </div>
              <div className='text-center text-sm'>
                {t('dont_have_account')}{' '}
                <LocaleLink
                  href='/signup'
                  className='underline underline-offset-4'
                >
                  {t('sign_up')}
                </LocaleLink>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        {t('by_clicking_continue')}{' '}
        <LocaleLink href='/terms-of-service'>
          {t('terms_of_service')}
        </LocaleLink>{' '}
        {t('and')}{' '}
        <LocaleLink href='/privacy-policy'>{t('privacy_policy')}</LocaleLink>.
      </div>
    </div>
  )
}
