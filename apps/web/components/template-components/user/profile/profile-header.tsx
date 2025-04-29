import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Skeleton } from '@/components/ui/skeleton'
import type { SetState, UserInfo } from '@/interfaces'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Centrize } from '../../other/centrize'
import EditProfileDialog from './dialogs/edit-dialog'
import { ProfileAvatar } from './profile-avatar'

type ParamsType = {
  data: UserInfo
  isAuth: boolean
  setData: SetState<UserInfo>
}

export const ProfileHeader = ({ data, isAuth, setData }: ParamsType) => {
  const [isBgLoading, setIsBgLoading] = useState(true)

  return (
    <div>
      <div className='px-2'>
        <div className='relative w-full h-36 sm:h-96 rounded-md bg-muted overflow-clip children-h-full'>
          {data.backgroundImageId ? (
            <Image
              alt=''
              fill={true}
              priority={true}
              onLoad={() => setIsBgLoading(false)}
              onError={() => setIsBgLoading(false)}
              className='object-cover w-full h-full'
              src={`/api/assets/id/${data.backgroundImageId}`}
              style={{
                opacity: isBgLoading ? 0 : 1
              }}
            />
          ) : null}
          <Skeleton
            className='w-full h-full top-0 absolute'
            hidden={!isBgLoading || data.backgroundImageId === null}
          />
        </div>
      </div>
      <Centrize className='px-10 py-4'>
        <div className='flex flex-row flex-wrap gap-x-4'>
          <div className='flex flex-col items-center sm:items-start mx-auto sm:ml-0 sm:grid sm:grid-cols-[auto,auto] h-36 sm:h-14'>
            <ProfileAvatar
              minUserName={data.nickname}
              className='-translate-y-1/2 border-2 border-foreground'
              avatarImage={
                data.avatarId ? `/api/assets/id/${data.avatarId}` : undefined
              }
            />
            <div className='flex flex-col items-center sm:items-start sm:pl-8 sm:translate-y-0 min-w-[200px] -translate-y-[45px]'>
              <TextAnimate
                delay={0.4}
                by='character'
                animation='slideLeft'
                className='font-bold leading-none text-2xl'
              >
                {data.nickname}
              </TextAnimate>
              <p className='leading-8'>
                <TextAnimate
                  as='span'
                  by='word'
                  delay={0.6}
                  animation='blurIn'
                  className='font-bold'
                >
                  0
                </TextAnimate>{' '}
                <TextAnimate
                  as='span'
                  delay={0.6}
                  by='character'
                  animation='slideLeft'
                  className='text-muted-foreground'
                >
                  Subscribers
                </TextAnimate>
              </p>
            </div>
          </div>

          <div className='flex-shrink-0 w-full sm:w-auto ml-auto'>
            {!data.isMe && isAuth && (
              <AnimatedSubscribeButton className='sm:w-36 w-full'>
                <span className='group inline-flex items-center'>
                  Follow
                  <ChevronRightIcon className='ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </span>
                <span className='group inline-flex items-center'>
                  <CheckIcon className='mr-2 size-4' />
                  Subscribed
                </span>
              </AnimatedSubscribeButton>
            )}
            {data.isMe && (
              <EditProfileDialog
                data={data}
                setData={setData}
                className='w-full'
              />
            )}
          </div>
        </div>
      </Centrize>
    </div>
  )
}
