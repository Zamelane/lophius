'use server'
import CreateUser from '@/actions/server/logics/create-user'
import { api_t_keys } from '@/i18n'
import type { ErrorResponse } from '@/interfaces'
import { createSession } from '@/lib/session'
import { SignupFormSchema } from '@/validates'
import { redirect } from 'next/navigation'

export async function signup(
  state: ErrorResponse | undefined,
  formData: FormData
): Promise<ErrorResponse | undefined> {
  // Валидация полей
  const validatedFields = await SignupFormSchema.safeParseAsync({
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    password: formData.get('password')
  })

  // Если какие-то поля не прошли валидацию, выкидываем описание ошибок
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  // Достаём данные для сохранения
  const { email, nickname, password } = validatedFields.data

  // Создаём пользователя в базе данных
  const user = await CreateUser({ email, nickname, password }).catch(() => {
    return {
      message: api_t_keys.error
    }
  })

  if (typeof user !== 'number') return user

  // Создаём сессию пользователя
  await createSession(user.toString())
  // Переводим на главную
  redirect('/')
}
