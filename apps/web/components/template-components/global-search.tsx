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
import { limitResults } from '@/actions/server/media/other/search/config'
import { useDebounce } from '@/hooks/debounce'
import { LocaleLink } from '@/hooks/locale-link'
import type { LayoutProps } from '@/interfaces'
import { cn } from '@/lib/utils'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, SearchSlashIcon } from 'lucide-react'
import { Image } from '../me-ui/image'
import { Button } from '../shadcn/ui/button'
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList
} from '../shadcn/ui/command'
import { DialogTitle } from '../shadcn/ui/dialog'
import { Spinner } from '../shadcn/ui/spinner'
import { SkewedToggle } from '../me-ui/skewed-toggle'
import ScrollContainer from 'react-indiana-drag-scroll'

export function GlobalSearch() {
  const { isOpen: open, setIsOpen: setOpen } = useGlobalSearchContext()

  // Конфигурация запроса
  const [searchQuery, setSearchQuery] = useState('')
  const [place, setPlace] = useState<PlaceType>('local')
  const [objectType, setObjectType] = useState<ObjectType>('media')
  const [mediaType, setMediaType] = useState<MediaType>('all')

  const tabs: {
    title: string,
    key: ObjectType
  }[] = [
      { title: 'Медиа', key: 'media' },
      { title: 'Человек', key: 'person' },
      { title: 'Персонаж', key: 'personage' },
      { title: 'Пользователь', key: 'user' }
    ];

  // Состояния
  const [isLoading, setIsLoading] = useState(false)
  const [isMoreLoading, setIsMoreLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResultType | undefined>(
    undefined
  )

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
  const fetchResults = useCallback(async (query: string, offset = 0) => {
    try {
      if (offset > 0) {
        setIsMoreLoading(true)
      } else {
        setIsLoading(true)
      }
      setError(null)

      if (!query) {
        setResults(undefined)
        return
      }

      const results = await Search({
        search: query,
        place,
        objectType,
        mediaType,
        offset
      })

      if (results) {
        setResults((prev) => {
          if (offset > 0) {
            return {
              ...results,
              medias: [...(prev?.medias ?? []), ...results.medias]
            }
          }

          return results
        })
      }
    } catch (err) {
      setError(`${err}`)
      //setResults(undefined)
    } finally {
      setIsLoading(false)
      setIsMoreLoading(false)
    }
  }, [place, objectType, mediaType])

  // Эффект для выполнения поиска
  useEffect(() => {
    fetchResults(debouncedQuery)
  }, [debouncedQuery, fetchResults])

  return (
    <AnimatePresence>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <DialogTitle className='hidden'>Окно поиск</DialogTitle>
        <CommandInput
          placeholder='Введите для поиска...'
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <div className='border-b border-border'>
          <ScrollContainer vertical={false} className='h-full'>
            <div className="flex gap-1 overflow-y-clip px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.title + tab.key}
                  onClick={() => setObjectType(tab.key)}
                  data-state={objectType === tab.key ? "active" : "inactive"}
                  className={cn(
                    "relative px-3 pt-3 pb-2 text-sm text-muted-foreground transition-colors",
                    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:rounded-t-[3px] after:transition-transform after:duration-200 after:ease-out after:translate-y-[4px] after:scale-x-90",
                    "data-[state=active]:text-foreground data-[state=active]:after:translate-y-0 data-[state=active]:after:scale-x-100"
                  )}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </ScrollContainer>
        </div>

        <div className='h-full overflow-hidden'>
          {isLoading && (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='h-full flex flex-col justify-center items-center'
            >
              <Spinner size='lg' className='bg-black dark:bg-white' />
            </motion.div>
          )}

          {!results?.current && !isLoading && (
            <motion.div
              key='empty'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='h-full flex flex-col justify-center items-center'
            >
              <p className='text-center'>Ничего не найдено</p>
            </motion.div>
          )}

          <CommandList className='px-4 py-2'>
            {results?.medias.map((m) => (
              <motion.div
                key={`media_item_${m.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <LocaleLink href={`/tv/${m.id}`} onClick={() => setOpen(false)}>
                  <CommandItem
                    value={`${m.id}`}
                    className='grid grid-cols-[auto,1fr] gap-x-2 h-[100px] overflow-clip'
                  >
                    <div
                      className={cn(
                        'h-full max-w-fit max-h-fit aspect-[5/7] rounded-[4px] text-center overflow-hidden',
                        'w-[54px] h-[75px]'
                      )}
                    >
                      {
                        m.poster ? (
                          <Image
                            className={cn(
                              'object-cover aspect-[5/7] max-w-fit max-h-fit',
                              m.isAdult && 'blur-[8px]'
                            )}
                            //src='https://image.tmdb.org/t/p/original/gstnSthunNwXD4kVyq9CC5JEP39.jpg'
                            src={`${m.poster.https ? 'https' : 'http'}://${m.poster.domain}${m.poster.path}`}
                            quality={55}
                            loading='lazy'
                            decoding='async'
                            alt='poster'
                            width={54}
                            height={75}
                          />
                        )
                          : (
                            <div className='h-full flex justify-center items-center bg-border'>
                              <SearchSlashIcon />
                            </div>
                          )
                      }
                    </div>
                    <div className='flex flex-col justify-center'>
                      <p className='text-xs text-secondary-foreground'>
                        Завершён
                      </p>
                      <p className='text-base mb-1 truncate'>{m.title}</p>
                      <p className='text-xs text-secondary-foreground opacity-80 mt-1'>
                        {[m.mediaType === 'kino' && 'Фильм'].join(',')}
                      </p>
                    </div>
                  </CommandItem>
                </LocaleLink>
              </motion.div>
            ))}
            {results && results.total - results.current > 0 && (
              <Button
                variant='secondary'
                size='sm'
                className='ml-1 mt-1'
                onClick={() => {
                  fetchResults(searchQuery, results?.current)
                }}
                disabled={isMoreLoading}
              >
                Ещё{' '}
                {results.total - results.current > limitResults
                  ? limitResults
                  : results.total - results.current}
                {isMoreLoading && <Loader2 className='animate-spin' />}
              </Button>
            )}
          </CommandList>
        </div>

        <div className='py-2 px-4 flex justify-between items-center border-t border-border'>
          <div className='flex flex-row items-center gap-2'>
            <p>Lophius</p>
            <div className='text-muted-foreground text-sm'>
              <NumberFlow value={results?.total ?? 'Infinity'} />
              {results && ' совпадения'}
            </div>
          </div>

          <SkewedToggle />
          {/* <Button variant='ghost' className='text-sm text-muted-foreground'>
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
          </Button> */}
        </div>
      </CommandDialog>
    </AnimatePresence>
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
