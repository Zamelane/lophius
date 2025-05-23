'use client'

import { useEffect, useRef, startTransition, useState } from "react"
import { useActionState } from "react"
import { ListsView } from "../ui/view"
import { getCurrentUserLists } from "../services/getCurrentUserLists"
import { Skeleton } from "@/src/shared/ui/shadcn/skeleton"
import { List } from "../types"
import { useUnsavedChangesWarning } from '@/src/shared/hooks/useUnsavedChangesRouterGuard';

export function ListsSettingsView() {
  const [ready, setReady] = useState(false)
  const [state, fetchLists, pending] = useActionState(
    async (_state: List[], payload: "kino" | "anime" | "comic" | "book" | "music") => {
      return await getCurrentUserLists(payload)
    },
    []
  )

  const [lists, setLists] = useState<List[]>([])
  const [listsBackup, setListsBackup] = useState<List[] | undefined>(undefined)

  const [showUpdateButton, setShowUpdateButton] = useState(false)

  //
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      startTransition(() => {
        fetchLists('kino')
        setReady(true)
      })
    }
  }, [fetchLists])

  useEffect(() => {
    setLists(state)
  }, [state])

  function notificateOnUpdate({ list, type }: NotificationOnListUpdate) {
    if (type === 'update') {
      setLists(state => state.map(l => {
        if (l.id === list.id)
          return list
        return l
      }))
      setListsBackup(state => state?.map(l => {
        if (l.id === list.id)
          return list
        return l
      }))
    }

    if (type === 'add') {
      setLists(old => [...old, list])
      if (listsBackup) {
        setListsBackup(old => [...old!, list])
      }
    }

    if (type === 'delete') {
      setLists(old => old.filter(l => l.id !== list.id))
      if (listsBackup) {
        setListsBackup(old => old!.filter(l => l.id !== list.id))
      }
    }
  }

  function changeSort(fn: (lists: List[]) => List[]) {
    const sortLists = fn(lists)
    if (!listsBackup) {
      setListsBackup(sortLists)
    }
    setLists(sortLists)
    setShowUpdateButton(true)
  }

  function approveSort() {
    if (listsBackup) {
      setListsBackup(undefined)
      setShowUpdateButton(false)
    }
  }

  useUnsavedChangesWarning(listsBackup !== undefined)

  return (
    <div>
      {pending || !ready
        ? (
          <div className="flex flex-col gap-2">
            { Array.from(Array(3).keys()).map(i => <Skeleton key={'ls' + i} className="w-full h-24" />) }
            <Skeleton className="w-32 h-10 mt-2"/>
          </div>
        )
        : <ListsView
            lists={lists}
            setLists={setLists}
            notificationOnListUpdate={notificateOnUpdate}
            updateButtonShow={showUpdateButton}
            changeSort={changeSort}
            approveSort={approveSort}
          />}
    </div>
  )
}

export type NotificationOnListUpdate = {
  list: List
  type: 'update' | 'add' | 'delete'
}