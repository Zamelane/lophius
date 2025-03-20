'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageInfoDataType } from "@/interfaces/edit-types";
import { ClassNameType, LanguageTranslation } from "@/interfaces";
import { Check, ListPlusIcon, ChevronsUpDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";

import { CreateLanguageDialog } from "./language-dialog/create-language-dialog";

type Props = {
  placeholder?: string
  languages: LanguageInfoDataType
}

export function LanguageSelect({ className, languages, placeholder }: Props & ClassNameType) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<LanguageTranslation|null>(null)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "justify-between",
            "text-muted-foreground",
            className
          )}
        >
          {value?.english_name ?? placeholder ?? 'Select language'}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command className="w-52">
          <CommandInput
            autoFocus
            className="h-9"
            placeholder="Поиск языков..."
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2">
                Нет ни одного совпадения
                <CreateLanguageDialog
                  languages={languages}
                  setValue={v => {
                    setValue(v)
                    setOpen(false)
                  }}>
                  <Button className="w-min">
                    <ListPlusIcon/>
                    Создать
                  </Button>
                </CreateLanguageDialog>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {
                languages.get.map((v, i) => (
                  <CommandItem
                    key={'l_' + i}
                    value={v.english_name}
                    onSelect={() => {
                      setValue(v)
                      setOpen(false)
                    }}
                  >
                    {v.english_name}
                    <Check
                      className={cn(
                        "ml-auto",
                        v === value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}