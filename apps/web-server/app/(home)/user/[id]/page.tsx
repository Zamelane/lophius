import { Centrize } from "@/components/template-components/other/centrize"
import { ProfileMenu } from "@/components/template-components/user/profile/profile-menu"
import { ProfileInfo } from "@/components/template-components/user/profile/profile-info"
import { ProfileHeader } from "@/components/template-components/user/profile/profile-header"

type IdType = {
  id: string
}

type ParamsType = {
  params: Promise<IdType>
}

export default async function UserPage({
  //params
}: ParamsType) {
  //const { id } = await params
  return (
    <div>
      <ProfileHeader/>
      <Centrize>
        <ProfileMenu/>
        <div className="mt-4">
          <ProfileInfo/>
        </div>
      </Centrize>
    </div>
  )
}