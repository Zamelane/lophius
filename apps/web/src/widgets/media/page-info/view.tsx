'use client'

import { ContentLayout } from "@/src/shared/ui/layout/content-layout";
import { ParseStatusCard } from "../../auto-parse/statusCard";
import { MobileBackdrop } from "@/src/shared/ui/media/page-components/mobileBackdrop";
import { DesktopSidebar } from "@/src/shared/ui/media/page-components/desktop-sidebar";
import { MobilePoster } from "@/src/shared/ui/media/page-components/mobile-poster";
import { TitleSection } from "@/src/shared/ui/media/page-components/title-section";
import { MobileActions } from "@/src/shared/ui/media/page-components/mobile-actions";
import { FilmInfo } from "./film-info";
import { MediaInfoType } from "@/src/shared/types/web-types";
import { useState } from "react";
import { useMediaInfoWebSocket } from "./hooks/useAutoParseSocketWrapper";

type Props = {
  mediaInfo?: MediaInfoType
  mediaListButton: React.ReactNode
}

export function MediaPageView({ mediaInfo: mediaInfoFromServer, mediaListButton }: Props) {
  const [] = useState(1)

  const {
    mediaInfo: realTimeMediaInfo,
    connected,
    disconnect
  } = useMediaInfoWebSocket({
    key: 'some-unique-id-or-key',
    initialData: {},
    onClose: () => console.log('Закрыт'),
    onError: err => console.error('Ошибка:', err)
  })

  const mediaInfo = mediaInfoFromServer || realTimeMediaInfo

  return (
    <ContentLayout className='px-0'>
      <ParseStatusCard />
      <MobileBackdrop mediaInfo={mediaInfo} />

      <div className='flex py-4 gap-4 px-[16px] md:px-[0]'>
        <DesktopSidebar mediaListButton={mediaListButton} mediaInfo={mediaInfo} />

        <div className='flex flex-col gap-4 flex-grow min-w-0 max-w-full'>
          <MobilePoster mediaInfo={mediaInfo} />
          <TitleSection mediaInfo={mediaInfo} />
          <MobileActions mediaListButton={mediaListButton} />
          <div className='flex flex-grow flex-col max-w-full'>
            <FilmInfo mediaInfo={mediaInfo} />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}