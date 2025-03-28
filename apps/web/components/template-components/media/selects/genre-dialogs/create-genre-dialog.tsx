'use client'

import { toast } from "sonner";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Dispatch, useState, SetStateAction } from "react";
import { LayoutProps, LanguageTranslation } from "@/interfaces";
import { Language, Translate, WithRequired } from "@/interfaces";
import { GenreInfoDataType, LanguageInfoDataType } from "@/interfaces/edit-types";
import { Dialog, DialogTitle, DialogHeader, DialogFooter, DialogContent, DialogTrigger, DialogDescription } from "@/components/shadcn/ui/dialog";

import { LanguageSelect } from "../language-select";

type Props = LayoutProps & {
  languages: LanguageInfoDataType,
  genres: GenreInfoDataType,
  setValue?: Dispatch<SetStateAction<LanguageTranslation|null>>
}

export function CreateGenreDialog({ genres, children, setValue, languages }: Props) {
  const [translations, setTranslations] = useState<{value: string, language: Language|null}[]>([])
  const [englishName, setEnglishName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  function add() {
    if (translations.length && translations[translations.length - 1].value.trim().length < 1)
      return

    setTranslations(prevTranslations => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations];
      newTranslations.push({ value: "", language: null })
      return newTranslations
    });
  }

  function remove(i: number) {
    setTranslations(prevTranslations => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations];
      newTranslations.splice(i, 1)
      return newTranslations
    })
  }

  function translationInputChange(value: string, i: number) {
    setTranslations(prevTranslations => {
      // Создаем новую копию массива
      const newTranslations = [...prevTranslations];
      // Изменяем значение в новой копии
      newTranslations[i].value = value;
      return newTranslations;
    });
  }
  function englishNameInputChange(value: string) {
    setEnglishName(value)
  }

  function handleSave() {
    for(const genre of genres.get)
      if (genre.english_name.toLocaleLowerCase() === englishName.toLocaleLowerCase())
      {
        toast.warning('Название жанра занято ノಠ_ಠノ', {
          description: `Жанр ('${englishName.toLocaleLowerCase()}') уже существует. Попробуйте найти его в поиске и использовать, не создавайте новый!`
        })
        return
      }
    
    if (englishName.length < 4) {
      toast.warning('Жанр некорректен (┳◇┳)', {
        description: 'Английское название жанра должно состоять хотя бы из 4х символов. Пожалуйста, поищите првильные название в интернете, если не уверены в правильности.'
      })
      return
    }

    const valueToSet = {
      iso_639_1: englishName,
      english_name: englishName.substring(0, 1).toUpperCase() + englishName.substring(1, englishName.length).toLocaleLowerCase(),
      translates: [
        ...(translations.filter(v => v.language && v.value.length > 0) as WithRequired<Translate, 'language'>[])
      ]
    }

    genres.set(oldValue => {
      const newValue = [...oldValue]
      newValue.push(valueToSet)
      return newValue
    })

    if (setValue !== undefined){
      setValue(valueToSet)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание жанра</DialogTitle>
          <DialogDescription>
            Введите жанр на английском и его переводы.
            Когда закончите, обязательно сохраните.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-row items-center gap-4">
            <Input id="iso-639-1" className="w-full" value={englishName} placeholder="Английское именование" onChange={v => englishNameInputChange(v.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {
            translations.map((v, i) => (
              <div key={"tc_" + i} className="flex flex-row gap-4">
                <LanguageSelect placeholder="Язык" languages={languages}/>
                <div className="w-full flex flex-row gap-2">
                  <Input value={v.value} id={"tc_i_" + 1} placeholder='Перевод на другой язык' onChange={v => translationInputChange(v.target.value, i)} />
                  <Button className="w-min" variant="destructive" onClick={() => remove(i)}>
                    <TrashIcon/>
                  </Button>
                </div>
              </div>
            ))
          }
        </div>
        <Button onClick={add} variant="secondary">
          <PlusIcon/>
          Добавить перевод
        </Button>
        <DialogFooter>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}