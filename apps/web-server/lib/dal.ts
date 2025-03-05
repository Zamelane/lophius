import 'server-only'
import { db      } from "@/db";
import { cache   } from "react";
import { eq      } from "drizzle-orm";
import { User    } from "@/interfaces";
import { cookies } from 'next/headers'
import { users   } from "@/db/tables";
import { decrypt } from '@/lib/session'

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

export const getUser = cache(async (): Promise<undefined|User> => {
  const session = await verifySession()
  if (!session?.userId) return

  try {
    return db.select({
      email: users.email,
      id: users.id,
      nickname: users.nickname
    })
      .from(users)
      .where(eq(users.id, session.userId))
      .then(r => {
        return {
          ...r[0],
          isAdmin: false // TODO: что-то с ролями решить
        }
      })
  } catch {
    console.log('Failed to fetch user')
    return
  }
})