'use server'

import { api_t_keys } from '@/src/shared/i18n'
import type { ApiResponse, UserInfo } from '@/src/shared/types'
import { verifySession } from '@/src/shared/lib/dal'
import { UpdateProfileSchema } from '@/src/features/auth/schemas/UpdateProfileSchema'
import { db, eq } from 'database'
import { users } from 'database/src/schemas'

type Params = {
  nickname?: string
  email?: string
  avatarId?: null | number
  backgroundId?: null | number
  bio?: string
}

export default async function UpdateUser(
  params: Params
): Promise<ApiResponse<UserInfo>> {
  const session = await verifySession()

  // Валидация полей
  const validatedFields = UpdateProfileSchema.safeParse({
    bio: params.bio ?? null,
    nickname: params.nickname,
    avatarId: params.avatarId ?? null,
    email: params.email?.toLocaleLowerCase(),
    backgroundId: params.backgroundId ?? null
  })

  // Если какие-то поля не прошли валидацию, выкидываем описание ошибок
  if (!validatedFields.success) {
    return {
      success: false,
      validateErrors: validatedFields.error.flatten().fieldErrors,
      error: {
        message: 'Validation error',
        i18n: api_t_keys.validation_error
      }
    }
  }

  // Достаём данные для поиска
  const {
    bio: validatedBio,
    email: validatedEmail,
    nickname: validatedNickname,
    avatarId: validatedAvatarId,
    backgroundId: validatedBackgroundId
  } = validatedFields.data

  const [data] = await db
    .update(users)
    .set({
      bio: validatedBio,
      email: validatedEmail,
      avatarId: validatedAvatarId,
      nickname: validatedNickname,
      backgroundImageId: validatedBackgroundId
    })
    .where(eq(users.id, session.userId ?? -1))
    .returning()

  const { id, bio, email, isAdmin, nickname, avatarId, backgroundImageId } =
    data

  return {
    success: true,
    data: {
      id,
      bio,
      email,
      isAdmin,
      nickname,
      avatarId,
      backgroundImageId
    }
  }
}
