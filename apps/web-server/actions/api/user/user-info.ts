import { getUser } from "@/lib/dal"

export async function MakeUserInfo(userId: number, userIdForCheckIsMe?: number) {
  const user = await getUser(userId, userIdForCheckIsMe)

  if (!user)
    return

  if (user.isMe)
    return user

  return {
    ...user,
    email: undefined,
    password: undefined
  }
}