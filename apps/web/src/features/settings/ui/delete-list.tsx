'use client'

import { LayoutProps } from "@/src/shared/types"
import { Button } from "@/src/shared/ui/shadcn/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/ui/shadcn/dialog"
import { Spinner } from "@/src/shared/ui/shadcn/spinner"
import { useState } from "react"

type Props = LayoutProps & {
  onContinue?: () => void
  onContinuePromise?: () => Promise<void>
}

export function DeleteList({ children, onContinue, onContinuePromise }: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  function CloseHandler() {
    setOpen(false)
  }

  async function ContinueHandler() {
    try {
      if (onContinue) {
        onContinue()
      }

      if (onContinuePromise) {
        setLoading(true)
        await onContinuePromise()
      }
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-4">
          <DialogTitle>Подтвердите действие</DialogTitle>
          <DialogDescription className="text-sm">Вы действительно хотите удалить список? Назад дороги не будет!</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 -mb-2 -mr-2">
          <Button variant='ghost' onClick={CloseHandler}>Отмена</Button>
          <Button variant='destructive' onClick={ContinueHandler}>
            {
              loading
                ? <Spinner size='sm' className="bg-white dark:bg-black"/>
                : 'Удалить'
            }
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}