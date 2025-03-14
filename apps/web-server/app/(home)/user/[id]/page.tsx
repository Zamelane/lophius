import { ParamsType } from "@/interfaces"
import { verifySession } from "@/lib/dal"
import { NotFound } from "@/components/ui/not-found"
import { MakeUserInfo } from "@/actions/api/user/user-info"
import { UserProfilePageComponent } from "@/components/template-components/user/profile"

export default async function UserPage({ params }: ParamsType) {
  const { id } = await params
  const session = await verifySession()
  const numberId = id === 'me' ? session?.userId : Number(id)

  if (!numberId || isNaN(numberId))
    return <p>Incorrect id</p>

  const user = await MakeUserInfo(numberId, session?.userId)

  if (!user)
    return <NotFound title="User not found"/>

  return <UserProfilePageComponent data={{ ...user, isMe: numberId === session?.userId }} />
}