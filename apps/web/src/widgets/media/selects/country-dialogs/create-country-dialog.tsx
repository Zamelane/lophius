'use client'

import { Button } from '@/src/shared/ui/shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/shared/ui/shadcn/dialog'
import { Input } from '@/src/shared/ui/shadcn/input'
import type { Language, Translate, WithRequired } from '@/src/shared/types'
import type {
  CountryTranslation,
  LanguageTranslation,
  LayoutProps
} from '@/src/shared/types'
import type {
  CountryInfoDataType,
  LanguageInfoDataType
} from '@/src/shared/types/edit-types'
import { PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

import { LanguageSelect } from '../language-select'

type Props = LayoutProps & {
  countries: CountryInfoDataType
  languages: LanguageInfoDataType
  setValue?: Dispatch<SetStateAction<CountryTranslation | null>>
}

export function CreateCountryDialog({
  children,
  setValue,
  countries,
  languages
}: Props) {
  const [translations, setTranslations] = useState<
    { value: string; language: Language | null }[]
  >([
    {
      value: '',
      language: null
    }
  ])
  const [iso_3166_1, setIso_3166_1] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [imgVisibility, setImgVisibility] = useState(false)

  function add() {
    if (translations[translations.length - 1].value.trim().length < 1) return

    setTranslations((prevTranslations) => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations]
      newTranslations.push({ value: '', language: null })
      return newTranslations
    })
  }

  function remove(i: number) {
    setTranslations((prevTranslations) => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations]
      newTranslations.splice(i, 1)
      return newTranslations
    })
  }

  function translationInputChange(value: string, i: number) {
    setTranslations((prevTranslations) => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations]
      // Изменяем значение в новой копии
      newTranslations[i].value = value
      return newTranslations
    })
  }
  function isoInputChange(value: string) {
    setIso_3166_1(value)
  }

  function handleSave() {
    for (const language of countries.get)
      if (
        language.iso_3166_1.toLocaleLowerCase() ===
        iso_3166_1.toLocaleLowerCase()
      ) {
        toast.warning('Код языка занят ノಠ_ಠノ', {
          description: `Язык с ISO-3166-1 ('${iso_3166_1.toLocaleLowerCase()}') уже существует. Попробуйте найти его в поиске и использовать, не создавайте новый!`
        })
        return
      }

    if (iso_3166_1.length !== 2) {
      toast.warning('ISO-3166-1 некорректен (┳◇┳)', {
        description:
          'Код ISO-3166-1 должен состоять из 2х символов. Пожалуйста, поищите эти коды в интернете, если не уверены в правильности.'
      })
      return
    }

    const english_name = translations[0].value

    if (english_name.length < 2) {
      toast.warning('Вы не ввели именование страны (на английском)')
      return
    }

    const valueToSet = {
      iso_3166_1,
      english_name,
      translates: [
        ...(translations.filter(
          (v) => v.language && v.value.length > 0
        ) as WithRequired<Translate, 'language'>[])
      ]
    }

    countries.set((oldValue) => {
      const newValue = [...oldValue]
      newValue.push(valueToSet)
      return newValue
    })

    if (setValue !== undefined) {
      setValue(valueToSet)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание страны</DialogTitle>
          <DialogDescription>
            Введите код страны (ISO 3166-1) и её переводы. Когда закончите,
            обязательно сохраните.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <div className='flex flex-row items-center'>
            <Image
              width={32}
              height={32}
              alt={iso_3166_1}
              className={imgVisibility ? 'mr-4' : 'w-0'}
              src={`/images/iso-3166-1/${iso_3166_1}.svg`}
              onErrorCapture={() => setImgVisibility(false)}
              onLoadingComplete={() => setImgVisibility(true)}
            />
            <Input
              id='iso-3166-1'
              value={iso_3166_1}
              className='w-full'
              placeholder='ISO-3166-1'
              onChange={(v) => isoInputChange(v.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 py-2'>
          {translations.map((v, i) => (
            <div key={`tc_3166_${i}`} className='flex flex-row gap-4'>
              {i !== 0 && (
                <LanguageSelect
                  placeholder='Язык'
                  languages={languages}
                  value={{
                    get: v.language,
                    set: (nsv) =>
                      setTranslations((state) =>
                        state.slice().map((sv, si) =>
                          si === i
                            ? {
                                ...sv,
                                language: {
                                  ...(nsv as LanguageTranslation)
                                }
                              }
                            : sv
                        )
                      )
                  }}
                />
              )}
              <div className='w-full flex flex-row gap-2'>
                <Input
                  value={v.value}
                  id={`tc_i_${1}`}
                  onChange={(v) => translationInputChange(v.target.value, i)}
                  placeholder={
                    i === 0
                      ? 'Название на английском'
                      : 'Перевод на другой язык'
                  }
                />
                {i !== 0 && (
                  <Button
                    className='w-min'
                    variant='destructive'
                    onClick={() => remove(i)}
                  >
                    <TrashIcon />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button onClick={add} variant='secondary'>
          <PlusIcon />
          Добавить перевод
        </Button>
        <DialogFooter>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
