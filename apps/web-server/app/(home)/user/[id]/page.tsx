import { ParamsType } from "@/interfaces"
import { GetUserByIdApiHandler } from "@/actions/api/user/[id]/route"
import { UserProfilePageComponent } from "@/components/template-components/user/profile"

export default async function UserPage({ params }: ParamsType) {
  const { id } = await params
  const user = await GetUserByIdApiHandler(id)

  return <UserProfilePageComponent id={id} fallbackData={user} />
}