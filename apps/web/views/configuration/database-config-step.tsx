'use client'

import { Button } from '@/src/shared/ui/shadcn/button'
import { Field } from '@/views/configuration/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatabaseIcon, LockIcon, ServerIcon, UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ExternalFormData = Partial<{
  dbHost: string
  dbDatabase: string
  dbPassword: string
  dbPort: string
  dbUser: string
}>

type Props = {
  onNext: () => void
  onPrevious: () => void
  updateFormData: (data: ExternalFormData) => void
  configData: ExternalFormData
}

export function DatabaseConfigStep({
  configData,
  onNext,
  onPrevious,
  updateFormData
}: Props) {
  const databaseConnectSchema = z.object({
    dbHost: z.string().min(1, 'Адрес подключения обязателен'),
    dbDatabase: z.string().min(1, 'Название базы данных обязательно'),
    dbPassword: z.string().min(1, 'Пароль для подключения обязателен'),
    dbPort: z
      .string()
      .min(1, 'Порт подключения обязателен')
      .regex(/^\d+$/, 'Должно быть числом'),
    dbUser: z.string().min(1, 'Имя пользователя для подключения обязательно')
  })
  type FormData = z.infer<typeof databaseConnectSchema>

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({
    defaultValues: {
      dbHost: configData.dbHost,
      dbDatabase: configData.dbDatabase,
      dbPassword: configData.dbPassword,
      dbPort: configData.dbPort,
      dbUser: configData.dbUser
    },
    resolver: zodResolver(databaseConnectSchema)
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
        id='dbHost'
        label='Хост'
        icon={ServerIcon}
        error={errors.dbHost?.message}
        placeholder='например, localhost или 127.0.0.1'
        {...register('dbHost')}
      />

      <Field
        min='0'
        id='dbPort'
        max='65535'
        label='Порт'
        type='number'
        placeholder='5432'
        error={errors.dbPort?.message}
        {...register('dbPort')}
      />

      <Field
        id='dbUsername'
        icon={UserIcon}
        label='Пользователь'
        placeholder='postgres'
        error={errors.dbUser?.message}
        {...register('dbUser')}
      />

      <Field
        label='Пароль'
        icon={LockIcon}
        id='dbPassword'
        placeholder='postgres'
        error={errors.dbPassword?.message}
        {...register('dbPassword')}
      />

      <Field
        id='dbName'
        icon={DatabaseIcon}
        label='База данных'
        placeholder='lophius'
        error={errors.dbDatabase?.message}
        {...register('dbDatabase')}
      />

      <div className='flex flex-row'>
        <Button
          variant='outline'
          onClick={onPrevious}
          className='max-w-min mr-auto'
        >
          Назад
        </Button>
        <Button type='submit' className='max-w-min ml-auto'>
          Дальше
        </Button>
      </div>
    </form>
  )
}
