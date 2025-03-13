import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type PropsType = {
  avatarImage?: string
  minUserName?: string
  className?: string
}

export const ProfileAvatar = (props: PropsType) => {
  const { className, avatarImage, minUserName } = props
  return (
    <Avatar
          className={cn(
            "size-28",
            className
          )}>
            <AvatarImage src={avatarImage} />
            <AvatarFallback
              className="text-4xl bg-muted-foreground">
                {
                  minUserName
                    ? minUserName.substring(0, 2).toUpperCase()
                    : null 
                }
            </AvatarFallback>
        </Avatar>
  )
}