'use client'

import { Button } from "@/src/shared/ui/shadcn/button"
import { Dispatch, SetStateAction, useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { List } from "@/src/features/settings/types"
import { SortableList } from "@/src/features/settings/ui/sortable-list"
import { NotificationOnListUpdate } from "../views/lists"
import { EditListSheet } from "./edit-list"
import { SaveIcon } from "lucide-react"
import { saveListSort } from "../services/saveListSort"
import { Spinner } from "@/src/shared/ui/shadcn/spinner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/shared/ui/shadcn/tooltip"

type Props = {
  lists: List[]
  setLists: Dispatch<SetStateAction<List[]>>
  notificationOnListUpdate: (values: NotificationOnListUpdate) => void
  changeSort: (fn: (list: List[]) => List[]) => void
  approveSort: () => void
  updateButtonShow?: boolean
}

export function ListsView({
  lists,
  notificationOnListUpdate,
  changeSort,
  approveSort,
  updateButtonShow
}: Props) {
  const [updating, setUpdating] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = lists.findIndex(item => item.id === active.id)
    const newIndex = lists.findIndex(item => item.id === over.id)

    if (oldIndex !== newIndex) {
      changeSort(prev => arrayMove(prev, oldIndex, newIndex))
    }
  }

  async function updateSort() {
    try {
      setUpdating(true)
      const result = await saveListSort(lists.map(l => l.id))
      if (result)
        approveSort()
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 pt-2 w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        //onDragEnd={handleDragEnd}
        id="lists"
      >
        <SortableContext items={lists.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {lists.map(list => (
            <SortableList
              key={'list' + list.id}
              list={list}
              notificationOnListUpdate={notificationOnListUpdate}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex justify-between mt-2">
        <EditListSheet
          title=""
          isHidden={false}
          mediaType="kino"
          notificationOnListUpdate={notificationOnListUpdate}
        >
          <Button className="max-w-fit">
            Добавить список
          </Button>
        </EditListSheet>
        {
          updateButtonShow && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
                    onClick={updateSort}
                    disabled={updating}
                  >
                    {
                      updating
                        ? <Spinner size='sm' className="bg-white dark:bg-black" />
                        : <SaveIcon />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-green-600 dark:bg-green-500 text-white">
                  <p>Сохранить сортировку</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }
      </div>
    </div >
  )
}