import { MediaInfoBlock } from '@/src/shared/ui/media/page-components/media-info-block'
import { MediaTagsBlock } from '../tags/media-tags-block'
import { DescriptionBlock } from '../../ui/description-block'
import { MediaBadgesBlock } from '../category-badges/media-badges-block'
import { MediaInfoType } from '@/src/shared/types/web-types'
import { VideoMediaCard } from '@/src/features/main-blocks/ui/media-card'
import { Section } from '@/src/features/main-blocks/ui/section'

export type Props = {
  mediaInfo: MediaInfoType
}

export function MediaInfoTab({ mediaInfo }: Props) {


  return (
    <div className='flex flex-col gap-4 pt-2 min-w-0 max-w-full'>
      <MediaInfoBlock mediaInfo={mediaInfo} orientation='horizontal' />
      <MediaTagsBlock mediaInfo={mediaInfo} />

      <DescriptionBlock mediaInfo={mediaInfo} />

      <MediaBadgesBlock mediaInfo={mediaInfo} />

      <div>
        <Section title="Рекомендации">
          {
            mediaInfo.meta?.recommendations?.map((a, i) => (
              <VideoMediaCard key={i} id={a.id} title={a.title?.text || ''} img={a.poster ? {
                width: null,
                height: null,
                ...a.poster?.img
              } : undefined} />
            ))
          }
        </Section>
      </div>
    </div>
  )
}
