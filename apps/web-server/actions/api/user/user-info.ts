import { getUser } from "@/lib/dal"
import { UserInfo } from "@/interfaces"

export async function MakeUserInfo(userId: number, userIdForCheckIsMe?: number): Promise<undefined|UserInfo> {
  const user = await getUser(userId)

  if (!user)
    return

  if (user.id === userIdForCheckIsMe)
    return user

  return {
    ...user,
    email: undefined,
    password: undefined
  }
}