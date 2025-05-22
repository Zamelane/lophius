'use client'

import { Button } from "@/src/shared/ui/shadcn/button";
import { cn } from "@/src/shared/lib/utils";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { motion } from 'motion/react';
import { List } from "./types";

export function SortableList({ list }: { list: List }) {
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
          "flex gap-2 justify-between border-[1px] rounded-md py-3 px-3.5 bg-white dark:bg-neutral-900 transition-shadow",
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
              !list.description && 'italic'
            )}>
              {list.description || 'Нет заметки'}
            </p>
          </div>
        </div>
        <div className="flex">
          <Button variant='ghost' size='icon'>
            <PencilIcon />
          </Button>
          <Button variant='ghost' size='icon' className="hover:bg-destructive text-destructive-foreground shadow-sm">
            <TrashIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}