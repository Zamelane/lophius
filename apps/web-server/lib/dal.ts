import 'server-only'
import { db      } from "@/db";
import { cache   } from "react";
import { eq      } from "drizzle-orm";
import { users   } from "@/db/tables";
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { files } from '@/db/tables/files';
import { alias } from 'drizzle-orm/pg-core';
import { CurrentUserInfo    } from "@/interfaces";

export type authData = {
  isAuth: boolean
  userId?: number
}

const noAuthObject = { isAuth: false }

export const verifySession = cache(async (): Promise<authData> => {
  const cookie = (await cookies()).get('session')?.value

  if (!cookie)
    return noAuthObject

  const session = await decrypt(cookie)
  
  if (!session?.userId)
    return noAuthObject

  return { isAuth: true, userId: Number.parseInt(session.userId) }
})

export const getCurrentUser = cache(async (): Promise<CurrentUserInfo|undefined> => {
  const session = await verifySession()
  if (!session?.userId) return

  try {
    return db.select({
      id: users.id,
      email: users.email,
      isAdmin: users.isAdmin,
      nickname: users.nickname
    })
      .from(users)
      .where(eq(users.id, session.userId))
      .then(r => {
        if (r.length)
          return {
            ...r[0] // TODO: что-то с ролями решить
          }
          return
      })
  } catch {
    console.log('Failed to fetch user')
    return
  }
})

export const getUser = cache(async (userId: number, userIdForCheckIsMe?: number) => {
  try {
    const avatar = alias(files, 'avatar');
    const background = alias(files, 'background');
    return db
      .select()
      .from(users)
      .leftJoin(avatar, eq(users.avatarId, avatar.id))
      .leftJoin(background, eq(users.backgroundImageId, background.id))
      .where(eq(users.id, userId))
      .then(r => {
        const { users, avatar, background } = r[0]
        return {
            ...users,
            avatar,
            background,
            isMe: users.id === userIdForCheckIsMe
        }
      })
      .catch(() => undefined)
  } catch {
    console.log('Error to fetch user ' + userId)
    return
  }
})