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
import type { ClassNameType, GenreTranslation } from '@/src/shared/types'
import type {
  GenreInfoDataType,
  LanguageInfoDataType
} from '@/src/shared/types/edit-types'
import { cn } from '@/src/shared/lib/utils'
import { Check, ChevronsUpDownIcon, ListPlusIcon } from 'lucide-react'
import { useState } from 'react'

import { CreateGenreDialog } from './genre-dialogs/create-genre-dialog'

type Props = {
  placeholder?: string
  languages: LanguageInfoDataType
  genres: GenreInfoDataType
}

export function GenreSelect({
  genres,
  className,
  languages,
  placeholder
}: Props & ClassNameType) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<GenreTranslation[]>([])

  function addOrRemoveValue(toSetValue: GenreTranslation) {
    const newValue = value.filter((v) =>
      v.english_name === toSetValue.english_name ? null : v
    )

    if (newValue.length === value.length) newValue.push(toSetValue)

    setValue(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('justify-between', 'text-muted-foreground', className)}
        >
          {value.length
            ? value.map((v) => v.english_name).join(', ')
            : (placeholder ?? 'Select country')}
          <ChevronsUpDownIcon className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command className='w-52'>
          <CommandInput
            autoFocus
            className='h-9'
            placeholder='Поиск жанров...'
          />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col items-center gap-2'>
                Нет ни одного совпадения
                <CreateGenreDialog genres={genres} languages={languages}>
                  <Button className='w-min'>
                    <ListPlusIcon />
                    Создать
                  </Button>
                </CreateGenreDialog>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {genres.get.map((v, i) => (
                <CommandItem
                  key={`l_${i}`}
                  value={v.english_name}
                  onSelect={() => {
                    addOrRemoveValue(v)
                  }}
                >
                  {v.english_name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value.find((f) => f.english_name === v.english_name)
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
