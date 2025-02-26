'use server'

import {api_t_keys} from "@/i18n";
import {redirect} from "next/navigation";
import {ErrorResponse} from "@/interfaces";
import {createSession} from "@/lib/session";
import FindUser from "@/actions/logics/find-user";
import {LoginFormSchema} from "@/validates/schemas/LoginFormSchema";

export async function login (state: ErrorResponse|void, formData: FormData): Promise<ErrorResponse|void> {
  // Валидация полей
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Если какие-то поля не прошли валидацию, выкидываем описание ошибок
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Достаём данные для поиска
  const { email, password } = validatedFields.data

  const user = await FindUser({ email, password })

  if (!user)
    return {
      message: api_t_keys.error
    }

  // Создаём сессию пользователя
  await createSession(user.toString())
  // Переводим на главную
  redirect('/')
}