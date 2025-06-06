import { MediaInfoType } from "@/src/shared/types/web-types"

export type Props = {
  mediaInfo: MediaInfoType
}

export function DescriptionBlock({ mediaInfo }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <h6 className='text-lg font-semibold'>Описание</h6>
      <p className='text-sm'>
        {mediaInfo.description ? (
          mediaInfo.description.text
        ) : (
          <i>Без описания ...</i>
        )}
      </p>
    </div>
  )
}