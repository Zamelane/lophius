'use client'

import { Button } from '@/src/shared/ui/shadcn/button'
import { Field } from '@/src/shared/ui/forms/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileChartPieIcon, LinkIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ExternalFormData = Partial<{
  publicUrl: string
  maxUploadFileSize: string
}>

type Props = {
  onNext: () => void
  updateFormData: (data: ExternalFormData) => void
  configData: ExternalFormData
  onPrevious: () => void
}

export function ServerConfigurationStep({
  configData,
  onNext,
  onPrevious,
  updateFormData
}: Props) {
  const serverConfigSchema = z.object({
    maxUploadFileSize: z
      .string()
      .min(1, 'Обязательно для заполнения')
      .max(15, 'Должно быть не больше 15 символов'),
    publicUrl: z
      .string()
      .min(1, 'Обязательно к заполнению')
      .regex(/^https?:\/\//, 'URL должен начинаться с http:// или https://')
  })

  type FormData = z.infer<typeof serverConfigSchema>

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({
    defaultValues: {
      maxUploadFileSize: configData.maxUploadFileSize,
      publicUrl: configData.publicUrl
    },
    resolver: zodResolver(serverConfigSchema)
  })

  const onSubmit = (data: FormData) => {
    updateFormData(data)
    onNext()
  }

  console.log(configData)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 animate-fadeIn'
    >
      <Field
        id='publicUrl'
        icon={LinkIcon}
        error={errors.publicUrl?.message}
        placeholder='https://localhost:3000'
        label={'Внешний url адрес (без / на конце)'}
        {...register('publicUrl')}
      />

      <Field
        type='number'
        placeholder='7340032'
        id='maxUploadFileSize'
        icon={FileChartPieIcon}
        error={errors.maxUploadFileSize?.message}
        label={'Максимальный размер загружаемых файлов (в байтах)'}
        {...register('maxUploadFileSize')}
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
