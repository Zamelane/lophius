import type { VideoCategoryType } from '@/src/shared/types'
import type { VideoCategoryInfoDataType } from '@/src/shared/types/edit-types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/shared/ui/shadcn/select'
import { CatIcon, VideoIcon } from 'lucide-react'

type Props = {
  videoCategory: VideoCategoryInfoDataType
}

export function VideoCategorySelect({ videoCategory: { set } }: Props) {
  return (
    <Select onValueChange={(v) => set(v as VideoCategoryType)}>
      <SelectTrigger>
        <SelectValue placeholder='Категория' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Категория</SelectLabel>
          <SelectItem value='film'>
            <div className='flex gap-2 items-center'>
              <VideoIcon width={16} height={16} />
              Кинематограф
            </div>
          </SelectItem>
          <SelectItem value='serial'>
            <div className='flex gap-2 items-center'>
              <CatIcon width={16} height={16} />
              Аниме
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
