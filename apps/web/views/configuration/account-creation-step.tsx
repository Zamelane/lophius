'use client'

import { Button } from '@/src/shared/ui/shadcn/button'
import { Field } from '@/views/configuration/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ExternalFormData = Partial<{
  nickname: string
  email: string
  password: string
}>

type Props = {
  onNext: () => void
  updateFormData: (data: ExternalFormData) => void
  configData: ExternalFormData
  //onPrevious: () => void,
}

export function AccountCreationStep({
  configData,
  onNext,
  updateFormData
}: Props) {
  const accountSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, 'Обязательно для заполнения')
      .max(255, 'Должно быть меньше 255 символов')
      .email('Должен быть адрес электронной почты'),
    nickname: z
      .string()
      .min(1, 'Обязательно для заполнения')
      .max(15, 'Должно быть не больше 15 символов'),
    password: z
      .string()
      .min(8, 'Должен быть не меньше 8 символов')
      .max(255, 'Должен быть меньше 255 символов')
  })
  type FormData = z.infer<typeof accountSchema>
  console.log(configData)
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({
    defaultValues: {
      email: configData.email,
      nickname: configData.nickname,
      password: configData.password
    },
    resolver: zodResolver(accountSchema)
  })

  const onSubmit = (data: FormData) => {
    updateFormData(data)
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 animate-fadeIn'
    >
      <Field
        id='nickname'
        label='Никнейм'
        icon={UserIcon}
        placeholder='admin'
        error={errors.nickname?.message}
        {...register('nickname')}
      />

      <Field
        id='email'
        label='Email'
        icon={MailIcon}
        error={errors.email?.message}
        placeholder='admin@example.com'
        {...register('email')}
      />

      <Field
        id='password'
        label='Пароль'
        icon={LockIcon}
        placeholder='***'
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type='submit' className='mt-4' variant='default'>
        Дальше
      </Button>
    </form>
  )
}
