import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/shared/ui/shadcn/select'
import type { SerialStatusType } from '@/src/shared/types'
import type { SerialProductionStatusInfoDataType } from '@/src/shared/types/edit-types'
import {
  BanIcon,
  ClockFadingIcon,
  LaptopMinimalCheck,
  type LucideIcon,
  PaintRollerIcon,
  SpeechIcon,
  TvMinimalPlayIcon
} from 'lucide-react'

type Props = {
  serialStatus: SerialProductionStatusInfoDataType
}

export function SerialProductionStatusSelect({ serialStatus: { set } }: Props) {
  const values: {
    text: string
    icon: LucideIcon
    value: SerialStatusType
  }[] = [
    {
      text: 'Онгоинг',
      value: 'ongoing',
      icon: TvMinimalPlayIcon
    },
    {
      icon: SpeechIcon,
      text: 'Анонсирован',
      value: 'coming out'
    },
    {
      value: 'planned',
      text: 'Запланирован',
      icon: ClockFadingIcon
    },
    {
      icon: PaintRollerIcon,
      text: 'В производстве',
      value: 'in production'
    },
    {
      text: 'Завершён',
      value: 'completed',
      icon: LaptopMinimalCheck
    },
    {
      icon: BanIcon,
      text: 'Отменён',
      value: 'canceled'
    }
  ]

  return (
    <Select onValueChange={(v) => set(v as SerialStatusType)}>
      <SelectTrigger>
        <SelectValue placeholder='Статус' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Статус производства</SelectLabel>
          {values.map((v, i) => (
            <SelectItem key={`ss_${i}`} value={v.value!}>
              <div className='flex gap-2 items-center'>
                <v.icon width={16} height={16} />
                {v.text}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
