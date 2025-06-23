'use client'

import type { VideoType } from '@/src/shared/types'
import type { VideoTypeInfoDataType } from '@/src/shared/types/edit-types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/shared/ui/shadcn/select'
import { SquarePlayIcon, SquareStackIcon } from 'lucide-react'

type Props = {
  videoType: VideoTypeInfoDataType
}

export function VideoTypeSelect({ videoType: { set } }: Props) {
  return (
    <Select onValueChange={(v) => set(v as VideoType)}>
      <SelectTrigger>
        <SelectValue placeholder='Тип контента' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Тип контента</SelectLabel>
          <SelectItem value='film'>
            <div className='flex gap-2 items-center'>
              <SquarePlayIcon width={16} height={16} />
              Фильм
            </div>
          </SelectItem>
          <SelectItem value='serial'>
            <div className='flex gap-2 items-center'>
              <SquareStackIcon width={16} height={16} />
              Сериал
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
