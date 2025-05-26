'use client'

import { CustomMenu, MenuContent, Tab } from "@/src/shared/ui/custom/custom-menu";
import { List } from "../settings/types";
import { useTranslations } from "next-intl";
import { GridLayout } from "@/src/shared/ui/layout/grid-layout";
import { GridMediaCard, Props as GridMediaCardProps } from "../media/ui/gridMediaCard";
import { useEffect, useState } from "react";
import { MediaType } from "database/schemas/media_types";
import { loadListMedias } from "./services/loadListMedias";

type Props = {
  lists: List[],
  mediaType: MediaType
}

type TabProps = Tab<number> & {
  medias: GridMediaCardProps[]
}

export function ListLibrary({
  lists,
  mediaType
}: Props) {
  const t = useTranslations('Lists')

  const initialTabs: TabProps[] = lists.map(list => ({
    id: list.id,
    title: list.i18nTitle ? t(list.i18nTitle) : list.title,
    medias: []
  }))

  const [tabs, setTabs] = useState(initialTabs)
  const [selectedTabId, setSelectedTabId] = useState<number | undefined>(initialTabs?.[0]?.id)
  const [loading, setLoading] = useState(false)

  async function loadMedias(listId: number) {
    const currentTab = tabs.find(tab => tab.id === listId)
    if (!currentTab || currentTab.medias.length > 0) return // Медиа уже загружены

    try {
      setLoading(true)
      const medias = await loadListMedias({ listId, mediaType })

      setTabs(state => state.map(tab => (
        tab.id === listId
          ? { ...tab, medias }
          : tab
      )))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedTabId !== undefined) {
      loadMedias(selectedTabId)
    }
  }, [selectedTabId])

  return (
    <div>
      <CustomMenu
        tabs={tabs}
        tabChange={setSelectedTabId}
      >
        {tabs.map(tab => (
          <MenuContent key={tab.id} id={tab.id}>
            <GridLayout>
              {tab.medias.map((media, i) => (
                <GridMediaCard key={i} {...media} />
              ))}
            </GridLayout>
          </MenuContent>
        ))}
      </CustomMenu>
    </div>
  )
}
