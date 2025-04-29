import type { ErrorResponse } from '@/interfaces'
import bcrypt from 'bcrypt'
import { db } from 'database'
import { users } from 'database/src/schemas'

export default async function CreateUser({
  email,
  nickname,
  password,
  isAdmin = false
}: {
  nickname: string
  email: string
  password: string
  isAdmin?: boolean
}): Promise<ErrorResponse | number> {
  // Хешируем пароль для хранения в БД
  const hashedPassword = await bcrypt.hash(password, 10)

  // Сохраняем пользователя в базе данных и возвращаем его id
  return await db
    .insert(users)
    .values({
      email,
      nickname,
      password: hashedPassword,
      isAdmin
    })
    .returning({ id: users.id })
    .then((v) => v[0].id)
}
