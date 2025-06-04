'use client'
import { LocaleLink } from "@/src/shared/hooks/locale-link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { LucideIcon } from "lucide-react"
import ScrollContainer from "react-indiana-drag-scroll"

type ChipType = {
  icon?: LucideIcon
  title: string
  href: string
}

export function TopChipsSection() {
  const chips: ChipType[] = [
    { icon: GitHubLogoIcon, title: "Наш GitHub", href: "https://github.com/zamelane/lophius" },
    { title: "фильмы", href: "/" },
    { title: "сериалы", href: "/" }
  ]
  
  return (
    <ScrollContainer vertical={false} className="flex select-none min-w-full max-w-full gap-2">
      {
        chips.map((c, i) => <Chip key={i} chip={c}/> )
      }
    </ScrollContainer>
  )
}

export function Chip({ chip }: { chip: ChipType }) {
  const accentClass = "gap-2 inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[12px] px-3 py-1.5 rounded-full pl-2"
  const defaultClass = "inline-flex flex-shrink-0 items-center border font-semibold transition-colors text-foreground text-[12px] px-3 py-1.5 rounded-full"

  return (
    <LocaleLink href={chip.href} className={chip.icon ? accentClass : defaultClass}>
      {
        chip.icon && <chip.icon className="size-[20px]"/>
      }
      {chip.title}
    </LocaleLink>
  )
}