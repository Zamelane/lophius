"use client"

import { SidebarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SearchForm } from "@/components/helps/search-form"
import { ModeToggle } from "@/components/helps/themes-toggle";

import BreadcrumbLogic from "../ui/broadcrumb-logic"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex sticky top-0 z-50 w-full items-center bg-background py-2">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator className="mr-2 h-4" orientation="vertical" />
        <BreadcrumbLogic/>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <div className="w-max">
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}