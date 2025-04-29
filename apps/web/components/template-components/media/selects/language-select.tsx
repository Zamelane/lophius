'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import type { ClassNameType, LanguageTranslation } from '@/interfaces'
import type {
  LanguageInfoDataType,
  WithInfoDataType
} from '@/interfaces/edit-types'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDownIcon, ListPlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { CreateLanguageDialog } from './language-dialogs/create-language-dialog'

type Props = {
  placeholder?: string
  languages: LanguageInfoDataType
  value: WithInfoDataType<LanguageTranslation | null>
}

export function LanguageSelect({
  className,
  languages,
  placeholder,
  value: { get: value, set: setValue }
}: Props & ClassNameType) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'justify-between',
            'text-muted-foreground',
            'justify-start',
            className
          )}
        >
          <div className='flex gap-1 items-center w-full'>
            {value?.english_name && (
              <Image
                width={16}
                height={16}
                alt={value.iso_639_1}
                src={`/images/iso-639-1/${value.iso_639_1}.svg`}
              />
            )}
            {value?.english_name ?? placeholder ?? 'Select language'}
            <ChevronsUpDownIcon className='opacity-50 ml-auto mr-1' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command className='w-52'>
          <CommandInput
            autoFocus
            className='h-9'
            placeholder='Поиск языков...'
          />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col items-center gap-2'>
                Нет ни одного совпадения
                <CreateLanguageDialog
                  languages={languages}
                  setValue={(v) => {
                    setValue(v)
                    setOpen(false)
                  }}
                >
                  <Button className='w-min'>
                    <ListPlusIcon />
                    Создать
                  </Button>
                </CreateLanguageDialog>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {languages.get.map((v, i) => (
                <CommandItem
                  key={`l_${i}`}
                  value={v.english_name}
                  onSelect={() => {
                    setValue(v)
                    setOpen(false)
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    alt={v.iso_639_1}
                    src={`/images/iso-639-1/${v.iso_639_1}.svg`}
                  />
                  {v.english_name}
                  <Check
                    className={cn(
                      'ml-auto',
                      v === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
