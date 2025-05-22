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
import type { ClassNameType, CountryTranslation } from '@/src/shared/types'
import type {
  CountryInfoDataType,
  LanguageInfoDataType
} from '@/src/shared/types/edit-types'
import { cn } from '@/src/shared/lib/utils'
import { Check, ChevronsUpDownIcon, ListPlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { CreateCountryDialog } from './country-dialogs/create-country-dialog'

type Props = {
  placeholder?: string
  countries: CountryInfoDataType
  languages: LanguageInfoDataType
}

export function CountrySelect({
  className,
  countries,
  languages,
  placeholder
}: Props & ClassNameType) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<CountryTranslation[]>([])

  function addOrRemoveValue(toSetValue: CountryTranslation) {
    const newValue = value.filter((v) =>
      v.iso_3166_1 === toSetValue.iso_3166_1 ? null : v
    )

    if (newValue.length === value.length) newValue.push(toSetValue)

    setValue(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'justify-between',
            'text-muted-foreground',
            'justify-start gap-0',
            className
          )}
        >
          {value.length
            ? value.map((v, i) => (
                <div className='flex gap-1' key={`iso_3166_1_${i}`}>
                  {i !== 0 && ', '}
                  <Image
                    width={16}
                    height={16}
                    alt={v.iso_3166_1}
                    src={`/images/iso-3166-1/${v.iso_3166_1}.svg`}
                  />
                  {v.english_name}
                </div>
              ))
            : (placeholder ?? 'Select country')}
          <ChevronsUpDownIcon className='opacity-50 ml-auto' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command className='w-52'>
          <CommandInput
            autoFocus
            className='h-9'
            placeholder='Поиск стран...'
          />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col items-center gap-2'>
                Нет ни одного совпадения
                <CreateCountryDialog
                  languages={languages}
                  countries={countries}
                >
                  <Button className='w-min'>
                    <ListPlusIcon />
                    Создать
                  </Button>
                </CreateCountryDialog>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {countries.get.map((v, i) => (
                <CommandItem
                  key={`l_${i}`}
                  value={v.english_name}
                  onSelect={() => {
                    addOrRemoveValue(v)
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    alt={v.iso_3166_1}
                    src={`/images/iso-3166-1/${v.iso_3166_1}.svg`}
                  />
                  {v.english_name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value.find((f) => f.iso_3166_1 === v.iso_3166_1)
                        ? 'opacity-100'
                        : 'opacity-0'
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
