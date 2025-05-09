import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select'
import type { KinoCategoryType } from '@/interfaces'
import type { KinoCategoryInfoDataType } from '@/interfaces/edit-types'
import { CatIcon, VideoIcon } from 'lucide-react'

type Props = {
  kinoCategory: KinoCategoryInfoDataType
}

export function KinoCategorySelect({ kinoCategory: { set } }: Props) {
  return (
    <Select onValueChange={(v) => set(v as KinoCategoryType)}>
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
