'use client'
import type React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  type MediaType,
  type ObjectType,
  type PlaceType,
  Search,
  type SearchResultType
} from '@/actions/server/media/other/search'
import { useDebounce } from '@/hooks/debounce'
import type { LayoutProps } from '@/interfaces'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../shadcn/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../shadcn/ui/command'
import { DialogTitle } from '../shadcn/ui/dialog'
import { Spinner } from '../shadcn/ui/spinner'

const Separator = () => <div className='-mx-1 h-px bg-border' />

export function GlobalSearch() {
  const { isOpen: open, setIsOpen: setOpen } = useGlobalSearchContext()

  // Конфигурация запроса
  const [searchQuery, setSearchQuery] = useState('')
  const [place, setPlace] = useState<PlaceType>('local')
  const [objectType, setObjectType] = useState<ObjectType>('media')
  const [mediaType, setMediaType] = useState<MediaType>('all')

  // Состояния
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResultType | undefined>(undefined)

  // Хуки
  const debouncedQuery = useDebounce(searchQuery.trim(), 400)

  // Регируем на сочитание клавиш для открытия модалки
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen])

  // Регистрируем функционал поиска
  const fetchResults = useCallback(async (query: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setResults(undefined)

      if (!query) {
        return
      }

      const results = await Search({
        search: query,
        place,
        objectType,
        mediaType
      })

      if (results) {
        setResults(results)
      }
    } catch (err) {
      setError(`${err}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Эффект для выполнения поиска
  useEffect(() => {
    fetchResults(debouncedQuery)
  }, [debouncedQuery, fetchResults])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      <DialogTitle className='hidden'>Окно поиск</DialogTitle>
      <CommandInput
        placeholder='Введите для поиска...'
        value={searchQuery}
        onValueChange={setSearchQuery}
      />

      <CommandList className='px-4 py-2'>
        <CommandEmpty>
          {isLoading && (
            <div className='flex justify-center items-center'>
              <Spinner size='lg' className='bg-black dark:bg-white' />
            </div>
          )}

          {!results && !isLoading && (
            <p className='text-center'>Ничего не найдено</p>
          )}
        </CommandEmpty>
        {results?.medias.map((m) => (
          <CommandItem
            value={`${m.id}`}
            key={`media_item_${m.id}`}
            className='grid grid-cols-[auto,1fr] gap-x-2 h-[100px]'
          >
            <div className='h-full relative max-w-fit max-h-fit aspect-[5/7] rounded-[4px] text-center overflow-hidden'>
              {
                m.poster && (
                  <Image
                    className='object-cover aspect-[5/7] max-w-fit max-h-fit'
                    //src='https://image.tmdb.org/t/p/original/gstnSthunNwXD4kVyq9CC5JEP39.jpg'
                    src={
                      (m.poster.https ? 'https' : 'http') + `://${m.poster.domain}${m.poster.path}`
                    }
                    alt='avatar'
                    fill
                  />
                )
              }
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-xs text-secondary-foreground'>Завершён</p>
              <p className='text-base mb-1'>{m.title}</p>
              <p className='text-xs text-secondary-foreground opacity-80 mt-1'>
                Фильм, 2020 г.
              </p>
            </div>
          </CommandItem>
        ))}
      </CommandList>

      <Separator />

      <div className='py-2 px-4 flex justify-between items-center'>
        <div className='flex flex-row items-center gap-2'>
          <p>Lophius</p>
          {
            results && (
              <p className='text-muted-foreground text-sm'>
                {results.total} элементов
              </p>
            )
          }
        </div>

        <Button variant='ghost' className='text-sm text-muted-foreground'>
          Открыть{' '}
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              className='h-2.5 w-2.5'
              strokeLinejoin='round'
              data-testid='geist-icon'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='currentColor'
                d='M13.5 3V2.25H15V3V10C15 10.5523 14.5523 11 14 11H3.56068L5.53035 12.9697L6.06068 13.5L5.00002 14.5607L4.46969 14.0303L1.39647 10.9571C1.00595 10.5666 1.00595 9.93342 1.39647 9.54289L4.46969 6.46967L5.00002 5.93934L6.06068 7L5.53035 7.53033L3.56068 9.5H13.5V3Z'
              />
            </svg>
          </kbd>
        </Button>
      </div>
    </CommandDialog>
  )
}

// Доступ к состоянию открытия из вне
type GlobalSearchContextType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(
  undefined
)

export const GlobalSearchProvider = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <GlobalSearchContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </GlobalSearchContext.Provider>
  )
}

export const useGlobalSearchContext = () => {
  const context = useContext(GlobalSearchContext)
  if (context === undefined) {
    throw new Error(
      'useGlobalSearchContext must be used within a GlobalSearchProvider'
    )
  }
  return context
}
