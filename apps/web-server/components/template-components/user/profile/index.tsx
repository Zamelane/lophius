'use client'

import { Suspense } from "react";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import { FallbackType } from "@/interfaces";
import { GetUserByIdApiHandlerType } from "@/actions/api/user/[id]/route";

import { ProfileInfo } from "./profile-info";
import { ProfileMenu } from "./profile-menu";
import { Centrize } from "../../other/centrize";
import { ProfileHeader } from "./profile-header";

type ParamsType = {
  id: string
} & FallbackType<Awaited<GetUserByIdApiHandlerType>>

export function UserProfilePageComponent({ id, fallbackData }: ParamsType) {
  return (
    <SWRLayer id={id} fallbackData={fallbackData} />
  )
}

function SWRLayer({ id, fallbackData }: ParamsType) {
  const { data } = useSWR<Awaited<GetUserByIdApiHandlerType>>(`/api/user/${id}`, fetcher, { fallbackData, suspense: true })
  return (
    <SWRConfig value={{fallbackData}}>
      <Suspense fallback={<h1>Загрузка...</h1>}>
        <Template data={data} />
      </Suspense>
    </SWRConfig>
  )
}

type TemplatePropsType = {
  data: Awaited<GetUserByIdApiHandlerType>|undefined
}

function Template({data}: TemplatePropsType) {
  const response = data
  if (!response || !response.success || !response.content)
    return <p>No data provided</p>

  return (
    <>
      <ProfileHeader data={response} />
      <Centrize>
        <ProfileMenu/>
        <div className="mt-4">
          <ProfileInfo/>
        </div>
      </Centrize>
    </>
  )
}