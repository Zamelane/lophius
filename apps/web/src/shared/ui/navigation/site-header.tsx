'use client'

import { useSidebar } from '@/src/shared/ui/shadcn/sidebar'
import { ModeToggle } from '@/src/shared/ui/toggles/themes-toggle'
import { SidebarIcon } from 'lucide-react'
import { Button } from '../shadcn/button'
import { Separator } from '../shadcn/separator'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const [title, setTitle] = useState<string | null>(null)
  const pathname = usePathname()

  // сбрасываем title при смене пути
  useEffect(() => {
    setTitle(null)
  }, [pathname])

  useEffect(() => {
    const handler = (e: CustomEvent) => setTitle(e.detail)
    window.addEventListener('header-title:set', handler as EventListener)
    return () => {
      window.removeEventListener('header-title:set', handler as EventListener)
    }
  }, [])

  return (
    <header className="-ml-[2px] md:ml-0 flex sticky top-0 z-50 w-full items-center justify-center bg-background/70 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-2 max-w-[1920px]">
        <Button
          size="icon"
          variant="ghost"
          className="aspect-square"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator className="mr-2 h-4" orientation="vertical" />

        <AnimatePresence>
          {title && (
            <motion.div
              className="text-xl font-medium truncate"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ml-auto w-max flex flex-row gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
