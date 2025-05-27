'use client'

import { CustomMenu, MenuContent, Tab } from "@/src/shared/ui/custom/custom-menu";
import { List } from "../settings/types";
import { useTranslations } from "next-intl";
import { GridLayout } from "@/src/shared/ui/layout/grid-layout";
import { GridMediaCard, Props as GridMediaCardProps } from "../media/ui/gridMediaCard";
import { useEffect, useRef, useState } from "react";
import { MediaType } from "database/schemas/media_types";
import { loadListMedias } from "./services/loadListMedias";
import { Spinner } from "@/src/shared/ui/shadcn/spinner";

type Props = {
  lists: List[],
  mediaType: MediaType
}

type TabProps = Tab<number> & {
  medias: GridMediaCardProps[],
  comment?: string | null
  hasMore: boolean
}

const PAGE_SIZE = 20

export function ListLibrary({ lists, mediaType }: Props) {
  const t = useTranslations('Lists')
  const isLoadingRef = useRef(false)

  const initialTabs: TabProps[] = [
    {
      id: -1,
      medias: [],
      hasMore: true,
      title: 'Все',
      badge: lists.reduce((sum, list) => (list.total ?? 0) + sum, 0) || undefined
    },
    ...lists.map(list => ({
      id: list.id,
      title: list.i18nTitle ? t(list.i18nTitle) : list.title,
      comment: list.comment,
      medias: [],
      page: 0,
      hasMore: true,
      badge: list.total || undefined
    }))
  ]

  const [tabs, setTabs] = useState(initialTabs)
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>(initialTabs?.[0]?.id)
  const [loading, setLoading] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  async function loadMore(listId: number) {
    const tab = tabs.find(t => t.id === listId)
    if (!tab || !tab.hasMore || isLoadingRef.current) return
    
    isLoadingRef.current = true
    setLoading(true)
    try {
      const newMedias = await loadListMedias({ listId, mediaType, offset: tab.medias.length, size: PAGE_SIZE })
      console.log({ listId, mediaType, offset: tab.medias.length, size: PAGE_SIZE })

      setTabs(prev =>
        prev.map(t =>
          t.id === listId
            ? {
              ...t,
              medias: [...t.medias, ...newMedias],
              hasMore: newMedias.length === PAGE_SIZE
            }
            : t
        )
      )
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }

  // Загрузка при выборе новой вкладки
  useEffect(() => {
    if (selectedTabId === undefined) return
    const tab = tabs.find(t => t.id === selectedTabId)
    if (tab && tab.medias.length === 0) {
      tab.hasMore = true
      loadMore(tab.id)
    }
  }, [selectedTabId])

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && selectedTabId !== undefined) {
          loadMore(selectedTabId)
        }
      },
      { rootMargin: '300px' }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loaderRef.current, selectedTabId, tabs])

  return (
    <div>
      <CustomMenu tabs={tabs} tabChange={setSelectedTabId}>
        {tabs.map(tab => (
          <MenuContent key={tab.id} id={tab.id}>
            {
              tab.comment && (
                <div className="flex flex-col gap-1 flex-grow border rounded-md py-3 px-3.5">
                  <h6 className="text-sm font-semibold">Заметка</h6>
                  <p className="text-sm break-all">{ tab.comment }</p>
                </div>
              )
            }
            <GridLayout>
              {tab.medias.map((media, i) => (
                <GridMediaCard key={i} {...media} />
              ))}
            </GridLayout>

            {tab.id === selectedTabId && (
              <div ref={loaderRef} className="flex justify-center py-4">
                {loading && <Spinner size='lg' className='bg-black dark:bg-white' />}
              </div>
            )}
          </MenuContent>
        ))}
      </CustomMenu>
    </div>
  )
}
