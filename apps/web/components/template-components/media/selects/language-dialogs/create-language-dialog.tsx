'use client'

import { toast } from "sonner";
import Image from "next/image";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Dispatch, useState, SetStateAction } from "react";
import { LanguageInfoDataType } from "@/interfaces/edit-types";
import { LayoutProps, LanguageTranslation } from "@/interfaces";
import { Language, Translate, WithRequired } from "@/interfaces";
import { EditSectionItem } from "@/components/me-ui/custom-edit";
import { Dialog, DialogTitle, DialogHeader, DialogFooter, DialogContent, DialogTrigger, DialogDescription } from "@/components/shadcn/ui/dialog";

import { LanguageSelect } from "../language-select";

type Props = LayoutProps & {
  languages: LanguageInfoDataType,
  setValue?: Dispatch<SetStateAction<LanguageTranslation|null>>
}

export function CreateLanguageDialog({ children, setValue, languages }: Props) {
  const [translations, setTranslations] = useState<{value: string, language: Language|null}[]>([
    {
      value: "",
      language: null
    }
  ])
  const [iso_639_1, setIso_639_1] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [imgVisibility, setImgVisibility] = useState(false)

  function add() {
    if (translations[translations.length - 1].value.trim().length < 1)
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
  function isoInputChange(value: string) {
    setIso_639_1(value)
  }

  function handleSave() {
    for(const language of languages.get)
      if (language.iso_639_1.toLocaleLowerCase() === iso_639_1.toLocaleLowerCase())
      {
        toast.warning('Код языка занят ノಠ_ಠノ', {
          description: `Язык с ISO-639-1 ('${iso_639_1.toLocaleLowerCase()}') уже существует. Попробуйте найти его в поиске и использовать, не создавайте новый!`
        })
        return
      }
    
    if (iso_639_1.length !== 2) {
      toast.warning('ISO-639-1 некорректен (┳◇┳)', {
        description: 'Код ISO-639-1 должен состоять из 2х символов. Пожалуйста, поищите эти коды в интернете, если не уверены в правильности.'
      })
      return
    }

    const english_name = translations[0].value

    if (english_name.length < 2) {
      toast.warning('Вы не ввели именование языка (на английском)')
      return
    }

    const valueToSet = {
      iso_639_1,
      english_name: english_name.substring(0, 1).toUpperCase() + english_name.substring(1, english_name.length).toLocaleLowerCase(),
      translates: [
        ...(translations.filter(v => v.language && v.value.length > 0) as WithRequired<Translate, 'language'>[])
      ]
    }

    languages.set(oldValue => {
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
          <DialogTitle>Создание языка</DialogTitle>
          <DialogDescription>
            Введите код языка (ISO 639-1) и его переводы.
            Когда закончите, обязательно сохраните.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex flex-row items-center">
            <Image
              width={32}
              height={32}
              alt={iso_639_1}
              className={imgVisibility ? 'mr-4' : 'w-0'}
              src={`/images/iso-639-1/${iso_639_1}.svg`}
              onErrorCapture={() => setImgVisibility(false)}
              onLoadingComplete={() => setImgVisibility(true)}
            />
            <Input id="iso-639-1" value={iso_639_1} className="w-full" placeholder="ISO-639-1" onChange={v => isoInputChange(v.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          {
            translations.map((v, i) => (
              <EditSectionItem key={"tc_" + i}>
                {/* TODO: Тут не надёжно, т.к. '!' */}
                {i !== 0 && <LanguageSelect
                  placeholder="Язык"
                  languages={languages}
                  className="min-w-[120px]"
                  value={{
                    get: v.language,
                    set: (nsv) => {setTranslations(state => state.slice().map(
                      (sv, si) => si === i ? {
                        ...sv,
                        language: {
                          ...(nsv as LanguageTranslation)
                        }
                    } : sv
                  ))}
                }} />}
                <div className="w-full flex flex-row gap-2">
                  <Input value={v.value} id={"tc_i_" + 1} onChange={v => translationInputChange(v.target.value, i)} placeholder={i === 0 ? 'Название на английском' : 'Перевод на другой язык'} />
                  {
                    i !== 0 && (
                      <Button className="w-min" variant="destructive" onClick={() => remove(i)}>
                        <TrashIcon/>
                      </Button>
                    )
                  }
                </div>
              </EditSectionItem>
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