import 'server-only'
import { cache    } from "react";
import { db       } from "database";
import { eq       } from "drizzle-orm";
import { cookies  } from 'next/headers'
import { UserInfo } from "@/interfaces";
import { decrypt  } from '@/lib/session'
import { users    } from "database/src/schemas";

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

export const getCurrentUser = cache(async (): Promise<undefined|UserInfo> => {
  const session = await verifySession()
  if (!session?.userId) return

  try {
    return db.select()
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

export const getUserById = cache(async (userId: number): Promise<undefined|UserInfo> => {
  try {
    // const avatar = alias(files, 'avatar');
    // const background = alias(files, 'background');
    return db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .then(r => {
        return r[0]
      })
      .catch(() => undefined)
  } catch {
    console.log('Error to fetch user ' + userId)
    return
  }
})

export const getUserByNickname = cache(async (nickname: string): Promise<undefined|UserInfo> => {
  try {
    // const avatar = alias(files, 'avatar');
    // const background = alias(files, 'background');
    return db
      .select()
      .from(users)
      .where(eq(users.nickname, nickname))
      .then(r => {
        return r[0]
      })
      .catch(() => undefined)
  } catch {
    console.log('Error to fetch user ' + nickname)
    return
  }
})