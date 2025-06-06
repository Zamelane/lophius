'use client'

import { cn } from '@/src/shared/lib/utils'
import { Button } from '@/src/shared/ui/button'
import { Button as ShadcnButton } from '@/src/shared/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/src/shared/ui/shadcn/dropdown-menu'
import { LoaderIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import type { List } from '../settings/types'
import { addToList } from './services/addToList'
import { removeFromList } from './services/removeFromList'
import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/src/shared/ui/credenza'
import { useMediaQuery } from '@/src/shared/hooks/useMediaQuery'

type Props = {
  lists: List[]
  inLists: number[]
  userId: number
  mediaId: number
}

export function ButtonList({
  lists,
  inLists: inListsFromServer,
  mediaId,
  userId
}: Props) {
  const t = useTranslations('Lists')

  const triggerRef = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState<number>()
  const [inLists, setInLists] = useState(inListsFromServer)

  const [addToListLoading, setAddToListLoading] = useState<number | undefined>(
    undefined
  )
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 767px)') // md breakpoint
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openCredenza, setOpenCredenza] = useState(false)

  // Подписываемся на события изменения списка
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{
        mediaId: number
        action: 'add' | 'remove'
        listId: number
      }>

      if (customEvent.detail.mediaId !== mediaId) return

      if (customEvent.detail.action === 'add') {
        setInLists([customEvent.detail.listId])
      }

      if (customEvent.detail.action === 'remove') {
        setInLists([])
      }
    }

    window.addEventListener('mediaList:updated', handler)
    return () => window.removeEventListener('mediaList:updated', handler)
  }, [mediaId])

  useEffect(() => {
    const button = triggerRef.current
    if (!button) return

    const updateWidth = () => setWidth(button.offsetWidth)
    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(button)

    return () => observer.disconnect()
  }, [isMobile])

  async function addToListHandler(listId: number) {
    try {
      setAddToListLoading(listId)
      if (inLists.length && !(await removeFromListHandler(inLists[0]))) {
        return
      }
      if (await addToList(listId, mediaId, userId)) {
        setInLists([listId])
        setOpenCredenza(false)
        setOpenDropdown(false)
        // Отправляем событие об успешном добавлении
        window.dispatchEvent(new CustomEvent('mediaList:updated', {
          detail: { mediaId, action: 'add', listId }
        }))
      }
    } finally {
      setAddToListLoading(undefined)
    }
  }

  async function removeFromListHandler(listId: number) {
    try {
      setRemoveLoading(true)
      if (await removeFromList(listId, mediaId, userId)) {
        setInLists([])
        setOpenCredenza(false)
        setOpenDropdown(false)
        // Добавляем событие об успешном удалении
        window.dispatchEvent(new CustomEvent('mediaList:updated', {
          detail: { mediaId, action: 'remove', listId }
        }))
        return true
      }
    } finally {
      setRemoveLoading(false)
    }

    return false
  }

  const list = lists.find((l) => inLists.includes(l.id))
  const TriggerButton = (
    <Button ref={triggerRef} className='w-full'>
      {
        (list?.i18nTitle && t(list.i18nTitle)) ||
        list?.title ||
        'Добавить в список'
      }
    </Button>
  )

  return (
    <>
      {
        isMobile && (
          <Credenza open={openCredenza} onOpenChange={setOpenCredenza}>
            <CredenzaTrigger asChild>
              <div>{TriggerButton}</div>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Управление списком</CredenzaTitle>
                <CredenzaDescription>
                  Добавим в список или удалим?
                </CredenzaDescription>
              </CredenzaHeader>
              <CredenzaBody>
                <div className="pb-2 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    {lists?.map((list) => (
                      <ShadcnButton
                        variant="outline"
                        onClick={() => addToListHandler(list.id)}
                        key={`list_${list.id}`}
                        className={cn(inLists.includes(list.id) && 'bg-accent')}
                      >
                        {list.id === addToListLoading && <div className="ml-auto" />}
                        {list.i18nTitle ? t(list.i18nTitle) : list.title}
                        {list.id === addToListLoading && (
                          <LoaderIcon className="ml-auto" />
                        )}
                      </ShadcnButton>
                    ))}
                  </div>
                  {inLists.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <ShadcnButton
                        variant="destructive"
                        onClick={() => removeFromListHandler(inLists[0])}
                      >
                        {removeLoading && <div className="ml-auto" />}
                        Удалить из списка
                        {removeLoading && <LoaderIcon className="ml-auto" />}
                      </ShadcnButton>
                    </>
                  )}
                </div>
              </CredenzaBody>
            </CredenzaContent>
          </Credenza>
        )
      }

      {
        !isMobile && (
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <Button ref={triggerRef}>
                {(list?.i18nTitle && t(list.i18nTitle)) ||
                  list?.title ||
                  'Добавить в список'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width }}>
              <DropdownMenuGroup>
                {lists?.map((list) => (
                  <DropdownMenuItem
                    onClick={() => addToListHandler(list.id)}
                    key={`list_${list.id}`}
                    className={cn(inLists.includes(list.id) && 'bg-accent')}
                  >
                    {list.i18nTitle ? t(list.i18nTitle) : list.title}
                    {list.id === addToListLoading && (
                      <LoaderIcon className="ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              {inLists.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeFromListHandler(inLists[0])}
                  >
                    Удалить из списка
                    {removeLoading && <LoaderIcon className="ml-auto" />}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </>
  )
}