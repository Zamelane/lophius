'use client'

import { InfoBlockItem } from "@/src/widgets/media/info-block-item"
import ScrollContainer from "react-indiana-drag-scroll"

export type InfoBlockProps = {
  items: InfoBlockItem[]
  orientation: 'vertical' | 'horizontal'
}

const scrollContainerClassName = {
  'vertical': 'border-[1px] border-border rounded-sm py-2 px-3 flex flex-col gap-2',
  'horizontal': 'flex select-none min-w-full max-w-full md:hidden pb-4 border-b-[1px] border-border'
}

const itemsContainerClassName = {
  'vertical': 'flex flex-col gap-2',
  'horizontal': 'flex gap-4 min-w-0'
}

export function InfoBlock({ items, orientation }: InfoBlockProps) {
  return (
    <ScrollContainer vertical={false} className={scrollContainerClassName[orientation]}>
      <div className={itemsContainerClassName[orientation]}>
        {
          items.map((item, i) => (
            <InfoBlockItem
              key={i}
              isLast={items.length - 1 === i}
              orientation={orientation}
              {...item}
            />
          ))
        }
      </div>
    </ScrollContainer>
  )
}