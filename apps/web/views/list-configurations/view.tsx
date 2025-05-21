'use client'

import { Button } from "@/components/shadcn/ui/button"
import { useState } from "react"
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
import { SortableList } from "@/views/list-configurations/sortable-list"
import { List } from "@/views/list-configurations/types"

export function ListsView() {
  const [lists, setLists] = useState<List[]>([
    { id: '1', title: 'В планах', description: '', isHidden: false },
    { id: '2', title: 'Брошено', description: '', isHidden: false },
    { id: '3', title: 'Завершено', description: '', isHidden: false }
  ])

  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = lists.findIndex(item => item.id === active.id)
    const newIndex = lists.findIndex(item => item.id === over.id)

    if (oldIndex !== newIndex) {
      setLists(prev => arrayMove(prev, oldIndex, newIndex))
    }
  }

  return (
    <div className="flex flex-col gap-2 pt-2 w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        //onDragEnd={handleDragEnd}
      >
        <SortableContext items={lists.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {lists.map(list => (
            <SortableList key={'l' + list.id} list={list} />
          ))}
        </SortableContext>
      </DndContext>
      <Button className="max-w-fit mt-2">
        Добавить список
      </Button>
    </div>
  )
}