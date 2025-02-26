import 'server-only'
import {db} from "@/db";
import {cache} from "react";
import {eq} from "drizzle-orm";
import {User} from "@/interfaces";
import { cookies } from 'next/headers'
import {usersTable} from "@/db/tables";
import { decrypt } from '@/lib/session'

type authData = {
  isAuth: boolean
  userId?: number
}

export const verifySession = cache(async (): Promise<authData> => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  
  if (!session?.userId)
    return { isAuth: false }

  return { isAuth: true, userId: Number.parseInt(session.userId) }
})

export const getUser = cache(async (): Promise<null|User> => {
  const session = await verifySession()
  if (!session?.userId) return null

  try {
    return db.select({
      email: usersTable.email,
      id: usersTable.id,
      nickname: usersTable.nickname
    })
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .then(r => {
        return {
          ...r[0],
          isAdmin: false // TODO: что-то с ролями решить
        }
      })
  } catch {
    console.log('Failed to fetch user')
    return null
  }
})