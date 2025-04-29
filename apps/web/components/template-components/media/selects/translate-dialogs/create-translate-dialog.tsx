'use client'

import { Button } from '@/components/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog'
import type { LanguageTranslation, LayoutProps } from '@/interfaces'
import type {
  KinoTranslateInfoDataType,
  LanguageInfoDataType
} from '@/interfaces/edit-types'
import { useState } from 'react'
import { toast } from 'sonner'

import { LanguageSelect } from '../language-select'

type Props = LayoutProps & {
  translates: KinoTranslateInfoDataType
  languages: LanguageInfoDataType
}

export function CreateTranslateDialog({
  children,
  languages,
  translates
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<LanguageTranslation | null>(null)

  function add() {
    if (!value) {
      toast.warning('Вы не выбрали язык для добавления перевода!')
      return
    }

    if (translates.get.find((v) => v.language.iso_639_1 === value.iso_639_1)) {
      toast.warning(`Выбранный выами язык (${value.iso_639_1}) уже добавлен`, {
        description:
          'Пожалуйста, воспользуйтесь поиском, ' +
          'чтобы добавить перевод для желаемого вами языка, т.к. он уже добавлен.'
      })
      return
    }

    translates.set((state) => [
      ...state,
      {
        overview: '',
        titles: [''],
        language: value
      }
    ])

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание перевода</DialogTitle>
          <DialogDescription>
            Выберите язык, для которого хотите добавить перевод или
            альтернативные заголовки.
          </DialogDescription>
          <div className='flex flex-col gap-2 py-2'>
            <LanguageSelect
              placeholder='Язык'
              languages={languages}
              value={{ get: value, set: setValue }}
            />
          </div>
          <DialogFooter>
            <Button onClick={add}>Добавить</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
