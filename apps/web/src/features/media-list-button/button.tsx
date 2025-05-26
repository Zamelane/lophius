"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/shadcn/dropdown-menu";
import { Button } from "@/src/shared/ui/button";
import { useRef, useState, useEffect } from 'react';
import { List } from "../settings/types";
import { useTranslations } from "next-intl";
import { cn } from "@/src/shared/lib/utils";
import { addToList } from "./services/addToList";
import { LoaderIcon } from "lucide-react";
import { removeFromList } from "./services/removeFromList";

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

  const [addToListLoading, setAddToListLoading] = useState<number | undefined>(undefined)
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  async function addToListHandler(listId: number) {
    try {
      setAddToListLoading(listId)
      if (inLists.length && !await removeFromListHandler(inLists[0])) {
        return
      }
      if (await addToList(listId, mediaId, userId)) {
        setInLists([listId])
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
        return true
      }
    } finally {
      setRemoveLoading(false)
    }

    return false
  }

  const list = lists.find(l => inLists.includes(l.id))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={triggerRef}>
          {
            list?.i18nTitle && t(list.i18nTitle) || list?.title || 'Добавить в список'
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width }}>
        <DropdownMenuGroup>
          {
            lists?.map(list => (
              <DropdownMenuItem
                onClick={() => addToListHandler(list.id)}
                key={'list_' + list.id}
                className={cn(inLists.includes(list.id) && 'bg-accent')}>
                {
                  list.i18nTitle
                    ? t(list.i18nTitle)
                    : list.title
                }
                {
                  list.id === addToListLoading && (
                    <LoaderIcon className="ml-auto" />
                  )
                }
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuGroup>
        {
          inLists.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={() => removeFromListHandler(inLists[0])}>
                Удалить из списка
                {
                  removeLoading && (
                    <LoaderIcon className="ml-auto" />
                  )
                }
              </DropdownMenuItem>
            </>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
