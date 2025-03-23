'use server'

import {api_t_keys} from "@/i18n";
import {createSession} from "@/lib/session";
import FindUser from "@/actions/server/logics/find-user";
import {LoginFormSchema} from "@/validates/schemas/LoginFormSchema";
import {ErrorResponse, ServerResponse, CurrentUserInfo} from "@/interfaces";

export async function login (state: ErrorResponse & ServerResponse<CurrentUserInfo>|void, formData: FormData): Promise<ErrorResponse & ServerResponse<CurrentUserInfo>|void> {
  // Валидация полей
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Если какие-то поля не прошли валидацию, выкидываем описание ошибок
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Достаём данные для поиска
  const { email, password } = validatedFields.data

  const user = await FindUser({ email, password })

  if (!user)
    return {
      success: false,
      message: api_t_keys.invalid_authentication_data
    }

  // Создаём сессию пользователя
  await createSession(user.id.toString())
  return {
    success: true,
    content: {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      nickname: user.nickname
    }
  }
}