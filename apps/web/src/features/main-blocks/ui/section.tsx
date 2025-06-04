'use client'

import { LayoutProps } from "@/src/shared/types";
import ScrollContainer from "react-indiana-drag-scroll";

export function Section({
  title,
  children
}: {
  title: string
} & LayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {title}
          </h2>
        </div>
      </div>

      <ScrollContainer vertical={false} className="flex select-none min-w-full max-w-full gap-2">
        {children}
      </ScrollContainer>
    </div>
  )
}