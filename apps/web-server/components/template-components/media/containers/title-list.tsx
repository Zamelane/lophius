'use client'
import { cn } from "@/lib/utils";
import { LayoutProps } from "@/interfaces";
import ScrollContainer from "react-indiana-drag-scroll";

type Props = {
  title: string,
  px?: number
}

export function TitleList({ px, title, children }: Props & LayoutProps) {
  const pxClass = px ? `px-${px}` : ''
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn("text-2xl font-semibold", pxClass)}>
            {title}
          </h1>
        </div>
      </div>
      <ScrollContainer
          vertical={false}
      >
        <div className={cn("flex select-none min-w-full max-w-full gap-1", pxClass)}>
          { children }
          <div className={px ? `min-w-[1px]` : ''}/>
        </div>
      </ScrollContainer>
    </div>
  )
}