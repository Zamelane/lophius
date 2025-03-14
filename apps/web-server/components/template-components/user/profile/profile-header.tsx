import Image from "next/image"
import { UserInfo } from "@/interfaces"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { TextAnimate } from "@/components/magicui/text-animate"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"

import { Centrize } from "../../other/centrize"
import { ProfileAvatar } from "./profile-avatar"
import EditProfileDialog from "./dialogs/edit-dialog"

type ParamsType = {
  data: UserInfo
}

export const ProfileHeader = ({
  data
}: ParamsType) => {

  return (
    <div>
      <div className="px-2">
        <div className="w-full h-56 sm:h-96 rounded-md bg-muted overflow-clip">
          { 
            data.background
            ? <Image
                alt=""
                width={3440}
                height={1440}
                className="object-cover w-full h-full"
                src={`/api/assets/${data.background.hash}`}
              />
            : null
          }
        </div>
      </div>

      <Centrize className="px-10 py-4">
        <div className="flex flex-row flex-wrap gap-x-4">
          <div className="flex flex-col items-center sm:items-start mx-auto sm:ml-0 sm:grid sm:grid-cols-[auto,auto] h-36 sm:h-14">
            <ProfileAvatar
              minUserName={data.nickname}
              className="-translate-y-1/2 border-2 border-foreground"
              avatarImage={data.avatar ? `/api/assets/${data.avatar.hash}` : ""}
            />
            <div className="flex flex-col items-center sm:items-start sm:pl-8 sm:translate-y-0 min-w-[200px] -translate-y-[45px]">
              <TextAnimate
                by="character"
                animation="slideLeft"
                className="font-bold leading-none text-2xl">
                {data.nickname}
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
              !data.isMe
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
                : <EditProfileDialog
                    data={data}
                    className="w-full"
                  />
            }
          </div>
        </div>
      </Centrize>
    </div>
  )
}