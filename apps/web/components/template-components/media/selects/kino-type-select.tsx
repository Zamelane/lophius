'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select'
import type { KinoType } from '@/interfaces'
import type { KinoTypeInfoDataType } from '@/interfaces/edit-types'
import { SquarePlayIcon, SquareStackIcon } from 'lucide-react'

type Props = {
  kinoType: KinoTypeInfoDataType
}

export function KinoTypeSelect({ kinoType: { set } }: Props) {
  return (
    <Select onValueChange={(v) => set(v as KinoType)}>
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
