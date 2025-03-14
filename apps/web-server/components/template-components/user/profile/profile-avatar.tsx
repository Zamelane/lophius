import { cn } from "@/lib/utils"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type PropsType = {
  avatarImage?: string
  minUserName?: string
  className?: string
}

export const ProfileAvatar = (props: PropsType) => {
  const { className, avatarImage, minUserName } = props
  const [ isLoading, setIsLoading ] = useState(true)
  return (
    <Avatar
          className={cn(
            "size-28 bg-muted-foreground",
            className
          )}>
            <AvatarImage 
              src={avatarImage}
              className="object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              style={{
                opacity: isLoading ? 0 : 1
              }}
            />
            <AvatarFallback
              className="text-4xl">
                {
                  isLoading && (avatarImage?.length ?? 0 > 0)
                  ? <Skeleton className="w-full h-full"/>
                  : (
                      minUserName
                      ? minUserName.substring(0, 2).toUpperCase()
                      : null 
                    )
                }
            </AvatarFallback>
        </Avatar>
  )
}