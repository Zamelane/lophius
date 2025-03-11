import { Centrize } from "@/components/template-components/other/centrize"
import { ProfileMenu } from "@/components/template-components/user/profile/profile-menu"
import { ProfileHeader } from "@/components/template-components/user/profile/profile-header"

type IdType = {
  id: string
}

type ParamsType = {
  params: Promise<IdType>
}

export default async function UserPage({
  params
}: ParamsType) {
  const { id } = await params
  return (
    <div>
      <ProfileHeader/>
      <Centrize>
        <ProfileMenu/>
      </Centrize>
    </div>
  )
}