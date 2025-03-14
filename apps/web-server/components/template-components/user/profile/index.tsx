'use client'

import { UserInfo } from "@/interfaces";

import { ProfileInfo } from "./profile-info";
import { ProfileMenu } from "./profile-menu";
import { Centrize } from "../../other/centrize";
import { ProfileHeader } from "./profile-header";

type ParamsType = {
  data: UserInfo
}

export function UserProfilePageComponent({ data }: ParamsType) {
  return (
    <>
      <ProfileHeader data={data} />
      <Centrize>
        <ProfileMenu/>
        <div className="mt-4">
          <ProfileInfo/>
        </div>
      </Centrize>
    </>
  )
}