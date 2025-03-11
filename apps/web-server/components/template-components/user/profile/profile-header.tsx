import Image from "next/image"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { TextAnimate } from "@/components/magicui/text-animate"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"

import { Centrize } from "../../other/centrize"
import { ProfileAvatar } from "./profile-avatar"
import EditProfileDialog from "./dialogs/edit-dialog"

export const ProfileHeader = async () => {
  const backgroundImage = "https://files.zmln.ru/%5Bwalls%5D%20%D0%9E%D0%B1%D0%BE%D0%B8/59.jpg"
  const avatarImage = "https://github.com/shadcn.png"
  const userName = "Nickname"
  const isMe = false
  return (
    <div>
      <div className="px-2">
        <div className="w-full h-96 rounded-md bg-muted overflow-clip">
          { 
            backgroundImage
            ? <Image
                alt=""
                width={3440}
                height={1440}
                src={backgroundImage}
                className="object-cover w-full h-full"
              />
            : null
          }
        </div>
      </div>

      <Centrize className="px-10 py-4">
        <div className="flex flex-row flex-wrap gap-x-4">
          <div className="grid grid-cols-[auto,auto] h-20">
            <ProfileAvatar
              minUserName={userName}
              avatarImage={avatarImage}
              className="-translate-y-1/2 border-2 border-foreground"
            />
            <div className="flex flex-col pl-8 min-w-[200px]">
              <TextAnimate
                by="character"
                animation="slideLeft"
                className="font-bold leading-none text-2xl">
                {userName}
              </TextAnimate>
              <p className="leading-8">
                <TextAnimate
                  as="span"
                  by="word"
                  delay={0.4}
                  animation="blurIn"
                  className="font-bold">
                    0
                </TextAnimate> {' '}
                <TextAnimate
                  as="span"
                  delay={0.6}
                  by="character"
                  animation="slideLeft"
                  className="text-muted-foreground">
                    Subscribers
                </TextAnimate>
              </p>
            </div>
          </div>
        
          <div className="flex-shrink-0 w-full sm:w-auto ml-auto">
            {
              isMe
                ? <AnimatedSubscribeButton className="sm:w-36 w-full">
                    <span className="group inline-flex items-center">
                      Follow
                      <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="group inline-flex items-center">
                      <CheckIcon className="mr-2 size-4" />
                      Subscribed
                    </span>
                  </AnimatedSubscribeButton>
                : <EditProfileDialog className="w-full"/>
            }
          </div>
        </div>
      </Centrize>
    </div>
  )
}