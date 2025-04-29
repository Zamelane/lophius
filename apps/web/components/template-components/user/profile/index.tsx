'use client'

import type { UserInfo } from '@/interfaces'
import { useState } from 'react'

import { Centrize } from '../../other/centrize'
import { ProfileHeader } from './profile-header'
import { ProfileInfo } from './profile-info'
import { ProfileMenu } from './profile-menu'

type ParamsType = {
  data: UserInfo
  isAuth: boolean
}

export function UserProfilePageComponent({ data, isAuth }: ParamsType) {
  const [get, set] = useState(data)
  return (
    <>
      <ProfileHeader data={get} setData={set} isAuth={isAuth} />
      <Centrize className='sm:px-4 px-0'>
        <ProfileMenu />
        <div className='mt-4 px-4 sm:px-0'>
          <ProfileInfo data={get} />
        </div>
      </Centrize>
    </>
  )
}
