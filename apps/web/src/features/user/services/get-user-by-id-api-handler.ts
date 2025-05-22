import { verifySession } from '@/src/shared/lib/dal'
import { MakeResponse } from '@/src/shared/lib/make-response'

import { MakeUserInfoById } from './user-info'

export async function GetUserByIdApiHandler(id: string) {
  const session = await verifySession()
  let user: Awaited<ReturnType<typeof MakeUserInfoById>>

  if (id === 'me') {
    if (session.userId)
      user = await MakeUserInfoById(session.userId, session.userId)
  } else {
    const numberId = Number(id)
    if (!Number.isNaN(numberId))
      user = await MakeUserInfoById(numberId, session.userId)
  }

  return MakeResponse(user, !!user)
}

export type GetUserByIdApiHandlerType = ReturnType<typeof GetUserByIdApiHandler>
