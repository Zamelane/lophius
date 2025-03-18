'use client'

import { cn } from "@/lib/utils";
import { LayoutProps } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import { Button } from "../ui/button";

type Tab = {
  id: string
  title: string
}

type Props = {
  tabs: Tab[]
  selected: Tab
  setSelected: Dispatch<SetStateAction<Tab>>
}

export function CustomMenu({ tabs, selected, setSelected }: Props) {
  return (
    <ScrollContainer className="flex select-none min-w-full max-w-full border-b-border border-b-[1px]">
      <div className="flex gap-1" style={{transform: 'none', transition: undefined, pointerEvents: 'auto'}}>
        {
          tabs.map(v => (
            <div key={v.id} className="flex flex-col gap-1">
              <Button
                variant="ghost"
                onClick={() => setSelected(v)}
                className={
                  selected.id === v.id
                  ? cn(
                    "inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none",
                    "disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                    "font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 py-2 [&_svg]:mr-1 justify-center"
                  )
                  : cn(
                    "inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm",
                    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
                    "[&_svg]:shrink-0 font-medium hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2 [&_svg]:mr-1 justify-center"
                  )
                }>
                <div className="flex gap-2 items-center">
                  {v.title}
                </div>
              </Button>
              { selected.id === v.id ? <div className="h-[2px] w-full transition-all bg-primary" /> : "" }
            </div>
          ))
        }
      </div>
    </ScrollContainer>
  )
}

export function MenuContent({ children }: LayoutProps) {
  return (
    <div className="flex flex-grow pt-2 max-w-full">
      <div className="flex flex-col gap-4 min-w-full">
        { children }
      </div>
    </div>
  )
}