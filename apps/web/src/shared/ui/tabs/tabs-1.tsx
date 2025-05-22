'use client'

import { cn } from '@/src/shared/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import React, {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useRef
} from 'react'
import { createPortal } from 'react-dom'
import ScrollContainer from 'react-indiana-drag-scroll'

function DropdownPortal({
  children,
  targetRef,
  isOpen
}: {
  children: React.ReactNode
  targetRef: React.RefObject<HTMLElement>
  isOpen: boolean
}) {
  const [container] = React.useState(() => document.createElement('div'))

  React.useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  const [coords, setCoords] = React.useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  })

  React.useEffect(() => {
    if (isOpen && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + window.scrollY + 3,
        left: rect.left + window.scrollX
      })
    }
  }, [isOpen, targetRef])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            zIndex: 9999,
            pointerEvents: 'auto'
          }}
          className='rounded-md border bg-popover p-1 shadow-md flex flex-col gap-1'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container
  )
}

export function Tabs({
  children,
  activeKey
}: {
  children: React.ReactNode
  activeKey: React.Key
}) {
  const [openSub, setOpenSub] = useState<string | null>(null)

  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    return cloneElement(child, {
      isActive: child.key === activeKey,
      isOpen: openSub === child.key,
      openSubMenu: () => setOpenSub(String(child.key)),
      closeSubMenu: () => setOpenSub(null),
      toggleSubMenu: () =>
        setOpenSub((prev) => (prev === child.key ? null : String(child.key)))
    })
  })

  return (
    <ScrollContainer
      vertical={false}
      className='min-h-max border-b border-border'
    >
      <div className='flex gap-1 px-2 relative'>{enhancedChildren}</div>
    </ScrollContainer>
  )
}

export type SubItem<T = string> = {
  key: T
  title: string
  selected?: boolean
  hideOnSelected?: boolean
}

interface TabProps<T = string> {
  title: string
  subItems?: SubItem<T>[]
  onSelect: () => void
  onSubItemSelect?: (key: T) => void
  selectedSubKey?: T
  isActive?: boolean
  isOpen?: boolean
  openSubMenu?: () => void
  closeSubMenu?: () => void
  toggleSubMenu?: () => void
}

export function Tab<T = string>({
  title,
  subItems,
  onSelect,
  onSubItemSelect,
  selectedSubKey,
  isOpen,
  isActive,
  closeSubMenu,
  toggleSubMenu
}: TabProps<T>) {
  const hasSub = subItems?.length
  const buttonRef = useRef<HTMLButtonElement>(null)

  // При клике на основную кнопку выбираем вкладку и закрываем меню, если оно было открыто
  const handleMainClick = (e: React.MouseEvent) => {
    if (isActive) {
      handleDropdownClick(e)
    } else {
      onSelect()
      closeSubMenu?.()
    }
  }

  // Кнопка рядом открывает/закрывает меню
  const handleDropdownClick = (e?: React.MouseEvent) => {
    e?.stopPropagation() // чтобы не сработал handleMainClick
    toggleSubMenu?.()
  }

  return (
    <div className='relative' key={title}>
      <div className='flex items-center overflow-hidden'>
        <button
          ref={buttonRef}
          onClick={handleMainClick}
          className={cn(
            'flex flex-row items-center',
            subItems?.find((v) => v.selected && !v.hideOnSelected)
              ? 'gap-2'
              : 'gap-1',
            hasSub ? 'pl-3 pr-1' : 'px-3',
            'relative pt-3 pb-2 text-sm text-muted-foreground transition-colors',
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:rounded-t-[3px] after:transition-transform after:duration-200 after:ease-out",
            isActive
              ? 'text-foreground after:translate-y-0 after:scale-x-100'
              : 'after:translate-y-[4px] after:scale-x-90'
          )}
        >
          {title}

          {hasSub && (
            <p
              onClick={handleDropdownClick}
              className={cn(
                'flex flex-row',
                'text-muted-foreground hover:text-foreground focus:outline-none text-xs',
                isOpen ? 'text-foreground' : ''
              )}
            >
              {subItems?.find((v) => v.selected && !v.hideOnSelected)?.title}
              <ChevronDownIcon size={16} />
            </p>
          )}
        </button>
      </div>

      {hasSub && (
        <DropdownPortal targetRef={buttonRef} isOpen={!!isOpen}>
          <AnimatePresence>
            {subItems?.map((sub) => (
              <motion.button
                key={sub.key as string}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  onSelect()
                  onSubItemSelect?.(sub.key)
                  closeSubMenu?.()
                }}
                className={cn(
                  'block w-full text-left px-3 py-1 text-sm rounded hover:bg-accent hover:text-accent-foreground',
                  selectedSubKey === sub.key &&
                    'bg-accent text-accent-foreground'
                )}
              >
                {sub.title}
              </motion.button>
            ))}
          </AnimatePresence>
        </DropdownPortal>
      )}
    </div>
  )
}
