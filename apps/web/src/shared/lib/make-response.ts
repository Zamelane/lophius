import { api_t_keys } from '../i18n'
import type { ServerResponse } from '@/src/shared/types'
import type { SafeParseReturnType } from 'zod'

export function MakeResponse<T>(
  data: T,
  success = true,
  message?: string
): ServerResponse<T> {
  return {
    message,
    success,
    content: data
  }
}

export const MakeTranslateResponse = <T>(
  message: string,
  i18nKey: string,
  success?: boolean,
  data?: T
) => ({
  data,
  message,
  i18nKey,
  success
})

export const MakeTranslateErrors = <T, R>(
  validatedFields: SafeParseReturnType<T, R>
) => {
  // Если какие-то поля не прошли валидацию, выкидываем описание ошибок
  if (validatedFields.success) return

  const fieldErrors = validatedFields.error.flatten().fieldErrors

  return MakeTranslateResponse(
    'Validation error',
    api_t_keys.validation_error,
    false,
    fieldErrors
  )
}
