import InputMessage from '@/src/shared/ui/forms/input-message'
import { Label } from '../shadcn/label'
import type { LayoutProps } from '@/src/shared/types'
import type { TranslationFunctionType } from '@/src/shared/types/translationFunctionType'

export default function FormInput({
  code,
  t_api,
  title,
  errors,
  children
}: LayoutProps & {
  errors: string[] | undefined
  t_api: TranslationFunctionType
  title: string
  code: string
}) {
  return (
    <div className='grid gap-2'>
      <div className='flex items-center'>
        <Label htmlFor={code}>{title}</Label>
        <InputMessage
          t={t_api}
          type='error'
          message={errors}
          className='ml-auto text-right'
        />
      </div>
      {children}
      <InputMessage t={t_api} type='error' message={errors} isMultiple={true} />
    </div>
  )
}
