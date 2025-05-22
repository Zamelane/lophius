'use client'

import { signup } from '@/actions/server/signup'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/shadcn/card'
import { InputCustom } from '@/src/shared/ui/custom/input-custom'
import InputPassword from '@/src/shared/ui/forms/input-password'
import { Label } from '@/src/shared/ui/shadcn/label'
import LoadingButton from '@/src/shared/ui/custom/loading-button'
import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { isErrorsIncluded } from '@/src/shared/lib/utils'
import { useTranslations } from 'next-intl'
import React, { useState, useActionState } from 'react'
import { toast } from 'sonner'

import FormInput from '@/src/shared/ui/forms/form-input'
import InputLimit from '@/src/shared/ui/forms/input-limit'

export default function SignupForm() {
  const t = useTranslations('SignupPage')
  const t_api = useTranslations('Api')
  const [state, action, pending] = useActionState(signup, undefined)
  const [getEmail, setEmail] = useState('')

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  React.useEffect(() => {
    if (!state) return

    if (state?.message) toast.info(t_api(state?.message))
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
                <FormInput
                  t_api={t_api}
                  code={'nickname'}
                  errors={state?.errors?.nickname}
                  title={t('nickname_field_title')}
                >
                  <InputLimit
                    required
                    type='text'
                    id='nickname'
                    maxLength={15}
                    name='nickname'
                    className={state?.errors?.nickname ? 'border-red-500' : ''}
                  />
                </FormInput>
                <FormInput
                  code='email'
                  t_api={t_api}
                  errors={state?.errors?.email}
                  title={t('email_field_title')}
                >
                  <InputCustom
                    required
                    id='email'
                    name='email'
                    type='email'
                    value={getEmail}
                    placeholder='m@example.com'
                    onChange={handleChangeEmail}
                    className={
                      isErrorsIncluded(state?.errors, 'email')
                        ? 'border-red-500'
                        : ''
                    }
                  />
                </FormInput>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>{t('password_field_title')}</Label>
                  <InputPassword
                    required
                    id='password'
                    name='password'
                    mustContain={t('must_contain')}
                    weakPassword={t('weak_password')}
                    least1number={t('at_least_1_number')}
                    mediumPassword={t('medium_password')}
                    strongPassword={t('strong_password')}
                    enterAPassword={t('enter_a_password')}
                    least1lowercase={t('at_least_1_lowercase')}
                    least1uppercase={t('at_least_1_uppercase')}
                    least8characters={t('at_least_8_characters')}
                    className={state?.errors?.password ? 'border-red-500' : ''}
                  />
                </div>
                <LoadingButton
                  type='submit'
                  text={t('signup')}
                  isLoading={pending}
                />
              </div>
              <div className='text-center text-sm'>
                {t('have_account')}{' '}
                <LocaleLink
                  href='/login'
                  className='underline underline-offset-4'
                >
                  {t('sign_in')}
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
