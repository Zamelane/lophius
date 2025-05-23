'use client'

import { Button } from "@/src/shared/ui/shadcn/button";
import { cn } from "@/src/shared/lib/utils";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { motion } from 'framer-motion';
import { List } from "../types";
import { EditListSheet } from "./edit-list";
import { NotificationOnListUpdate } from "../views/lists";
import { DeleteList } from "./delete-list";
import { deleteList } from "../services/deleteList";

type Props = {
  list: List
  notificationOnListUpdate: (values: NotificationOnListUpdate) => void
}

export function SortableList({ list, notificationOnListUpdate }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({ id: list.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  async function deleteListAndNotificate() {
    const result = await deleteList(list.id)

    if (result) {
      notificationOnListUpdate({
        list,
        type: 'delete'
      })
    }
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <div
        className={cn(
          "flex gap-2 justify-between border-[1px] rounded-md py-3 px-3.5 bg-sidebar-primary-foreground dark:bg-background transition-shadow",
          isDragging && "ring-2 ring-primary/50 shadow-lg bg-muted"
        )}
      >
        <div className="flex items-start gap-3">
          {/* Drag handle */}
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing pt-1 text-muted-foreground select-none touch-none"
          >
            <GripVerticalIcon size={18} />
          </div>
          {/* List content */}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-md">{list.title}</h2>
            <p className={cn(
              "text-sm opacity-85",
              !list.comment && 'italic'
            )}>
              {list.comment || 'Нет заметки'}
            </p>
            {
              list.isSystem && (
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full">
                    Системная
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="flex">
          <EditListSheet isEdit
            id={list.id}
            isSystem={list.isSystem}
            isHidden={list.isHidden}
            title={list.title}
            comment={list.comment}
            notificationOnListUpdate={notificationOnListUpdate}
          >
            <Button variant='ghost' size='icon' className="light:bg-red-400">
              <PencilIcon />
            </Button>
          </EditListSheet>
          <DeleteList onContinuePromise={deleteListAndNotificate}>
            <Button variant='ghost' size='icon' className="hover:bg-destructive dark:shadow-sm text-destructive" disabled={list.isSystem}>
              <TrashIcon />
            </Button>
          </DeleteList>
        </div>
      </div>
    </motion.div>
  )
}