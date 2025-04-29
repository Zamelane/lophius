'use server'

import { cookies } from 'next/headers'

export async function ClearCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
