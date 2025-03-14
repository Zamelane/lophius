'use client'

import { useState } from "react";
import { UserInfo } from "@/interfaces";

import { ProfileInfo } from "./profile-info";
import { ProfileMenu } from "./profile-menu";
import { Centrize } from "../../other/centrize";
import { ProfileHeader } from "./profile-header";

type ParamsType = {
  data: UserInfo,
  isAuth: boolean
}

export function UserProfilePageComponent({ data, isAuth }: ParamsType) {
  const [get, set] = useState(data)
  return (
    <>
      <ProfileHeader data={get} setData={set} isAuth={isAuth} />
      <Centrize>
        <ProfileMenu/>
        <div className="mt-4">
          <ProfileInfo data={get}/>
        </div>
      </Centrize>
    </>
  )
}