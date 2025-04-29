import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type PropsType = {
  avatarImage?: string
  minUserName?: string
  className?: string
}

export const ProfileAvatar = (props: PropsType) => {
  const { className, avatarImage, minUserName } = props
  const [isLoading, setIsLoading] = useState(true)
  return (
    <Avatar className={cn('size-28 bg-muted-foreground', className)}>
      {avatarImage && (
        <AvatarImage
          width={0}
          height={0}
          alt='avatar'
          src={avatarImage}
          className='object-cover'
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          style={{
            opacity: isLoading ? 0 : 1
          }}
        />
      )}
      <AvatarFallback className='text-4xl'>
        {isLoading && (avatarImage?.length ?? 0) > 0 ? (
          <Skeleton className='w-full h-full' />
        ) : minUserName ? (
          minUserName.substring(0, 2).toUpperCase()
        ) : null}
      </AvatarFallback>
    </Avatar>
  )
}
