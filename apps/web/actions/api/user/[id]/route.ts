import { verifySession } from "@/lib/dal"
import { MakeResponse } from "@/lib/make-response"

import { MakeUserInfoById } from "../user-info"

export async function GetUserByIdApiHandler(id: string) {
  const session = await verifySession()
  let user

  if (id === 'me') {
    if (session.userId)
      user = await MakeUserInfoById(session.userId, session.userId)
  } else {
    const numberId = Number(id)
    if (!isNaN(numberId))
      user = await MakeUserInfoById(numberId, session.userId)
  }

  return MakeResponse(user, !!user)
}

export type GetUserByIdApiHandlerType = ReturnType<typeof GetUserByIdApiHandler>