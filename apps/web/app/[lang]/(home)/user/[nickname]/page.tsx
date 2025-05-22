import { CachedMakeUserInfoByNickname } from '@/actions/api/user/user-info'
import { UserProfilePageComponent } from '@/src/widgets/profile'
import { NotFound } from '@/src/shared/ui/misc/not-found'
import { verifySession } from '@/src/shared/lib/dal'
//import { ResolvingMetadata } from "next"
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ nickname: string }>
}

export async function generateMetadata(
  { params }: Props
  //parent: ResolvingMetadata
): Promise<Metadata> {
  const { nickname } = await params

  const user = await CachedMakeUserInfoByNickname(nickname)

  if (!user)
    return {
      title: 'User not found'
    }

  return {
    title: user.nickname,
    description: user.bio,
    verification: {
      other: {
        lophius: `@${user.nickname}`
      }
    },
    openGraph: {
      type: 'profile',
      title: user.nickname,
      description: user.bio ?? '',
      images: `/api/og/user/${user.id}`
      //url:
    }
  }
}

export default async function UserPage({ params }: Props) {
  const { nickname } = await params
  const session = await verifySession()

  const user = await CachedMakeUserInfoByNickname(nickname, session?.userId)

  if (!user) return <NotFound title='User not found' />

  return (
    <UserProfilePageComponent
      isAuth={session.isAuth}
      data={{ ...user, isMe: user.id === session?.userId }}
    />
  )
}
