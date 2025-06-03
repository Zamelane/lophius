'use client'
import type React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { Search } from '@/src/features/media/search/search'
import { limitResults } from '@/src/features/media/search/search/config'
import type {
  MediaType,
  ObjectType,
  SearchResultType
} from '@/src/features/media/search/types'
import { useSearchWebSocket } from '@/src/features/online-search/hooks/useSearchWebSocket'
import { useDebounce } from '@/src/shared/hooks/debounce'
import type { LayoutProps } from '@/src/shared/types'
import { Tab, Tabs } from '@/src/shared/ui/tabs/tabs-1'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Button } from '../../shared/ui/shadcn/button'
import {
  CommandDialog,
  CommandInput,
  CommandList
} from '../../shared/ui/shadcn/command'
import { DialogTitle } from '../../shared/ui/shadcn/dialog'
import { Spinner } from '../../shared/ui/shadcn/spinner'
import { SkewedToggle } from '../../shared/ui/toggles/skewed-toggle'
import { GlobalSearchItemCard } from './items/gs-card-item'

type TabType = {
  title: string
  key: ObjectType
  subItems?: {
    title: string
    hideOnSelected?: boolean
    selected?: boolean
    key: MediaType
  }[]
}

export function GlobalSearch() {
  const { isOpen: open, setIsOpen: setOpen } = useGlobalSearchContext()

  // Конфигурация запроса
  const [searchQuery, setSearchQuery] = useState('')
  const [objectType, setObjectType] = useState<ObjectType>('media')
  const [mediaType, setMediaType] = useState<MediaType>('all')

  const [tabs, setTabs] = useState<TabType[]>([
    {
      title: 'Медиа',
      key: 'media',
      subItems: [
        {
          title: 'все',
          key: 'all',
          hideOnSelected: true
        },
        {
          title: 'фильмы',
          key: 'kino'
        },
        {
          title: 'книги',
          key: 'book'
        }
      ]
    },
    { title: 'Человек', key: 'person' },
    { title: 'Персонаж', key: 'personage' },
    { title: 'Пользователь', key: 'user' }
  ])

  // Состояния
  const [isLoading, setIsLoading] = useState(false)
  const [isMoreLoading, setIsMoreLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResultType | undefined>(
    undefined
  )

  // Хук онлайн поиска
  const {
    connect,
    disconnect,
    status,
    error: wsError,
    results: wsResults,
    resultsLength: wsResultsLength
  } = useSearchWebSocket({
    query: searchQuery,
    mediaType: mediaType === 'all' ? 'kino' : mediaType,
    objectType
  })

  // Режим поиска
  const [isOnlineSearch, setIsOnlineSearch] = useState(false)

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
  const fetchResults = useCallback(
    async (query: string, offset = 0) => {
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
          place: isOnlineSearch ? 'ethernet' : 'local',
          objectType,
          mediaType,
          offset
        })

        if (results) {
          setResults((prev) => {
            if (offset > 0) {
              return {
                ...results,
                items: [...(prev?.items ?? []), ...results.items]
              }
            }

            return results
          })
        } else {
          setResults(undefined)
        }
      } catch (err) {
        setError(`${err}`)
        //setResults(undefined)
      } finally {
        setIsLoading(false)
        setIsMoreLoading(false)
      }
    },
    [isOnlineSearch, objectType, mediaType]
  )

  // Обработчик онлайн поиска
  const onlineSearchHandler = async () => {
    try {
      if (!searchQuery) return
      await connect()
    } catch (error) {
      if (error) {
        console.error(error)
      }
    }
  }

  // Эффект для выполнения поиска
  useEffect(() => {
    fetchResults(debouncedQuery)
  }, [debouncedQuery, fetchResults])

  // Регистрируем функционал переключения онлайна поиска
  const setIsOnlineHandler = (value: boolean) => {
    setIsOnlineSearch(value)
    localStorage.setItem('isOnlineSearch', value ? 'true' : 'false')
  }

  // Загружаем состояния из памяти после монтирования
  useEffect(() => {
    const isOnlineState = localStorage.getItem('isOnlineSearch')
    setIsOnlineSearch(isOnlineState === 'true')
  }, [])

  // Не даём попасть типу 'all' в онлайн поиск
  // TODO: таб не реагирует на принудительное изменение
  useEffect(() => {
    if (isOnlineSearch && mediaType === 'all') {
      setMediaType('kino')
    }
  }, [isOnlineSearch, mediaType])

  return (
    <AnimatePresence>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <DialogTitle className='hidden'>Окно поиск</DialogTitle>
        <CommandInput
          placeholder='Введите для поиска...'
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isOnlineSearch) {
              e.preventDefault()
              disconnect()
              onlineSearchHandler()
            }
          }}
        />

        <Tabs activeKey={objectType}>
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              title={tab.title}
              subItems={tab.subItems}
              onSelect={() => setObjectType(tab.key)}
              onSubItemSelect={(key) => {
                console.log(key)
                console.log(tab)
                setMediaType(key)
                setTabs((tabs) => {
                  tabs.map((searchTab) => {
                    if (tab.key === searchTab.key) {
                      searchTab.subItems?.map((si) => {
                        si.selected = si.key === key
                      })
                    }
                  })
                  return tabs
                })
              }}
              selectedSubKey={mediaType}
            />
          ))}
        </Tabs>

        <div className='h-full overflow-hidden'>
          {isLoading ||
            (status !== 'closed' && wsResults.length === 0 && (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='h-full flex flex-col justify-center items-center'
              >
                <Spinner size='lg' className='bg-black dark:bg-white' />
                {status}
              </motion.div>
            ))}

          {(!results?.current || error) &&
            !isLoading &&
            wsResults.length === 0 &&
            status === 'closed' && (
              <motion.div
                key='empty'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className='h-full flex flex-col justify-center items-center'
              >
                <p className='text-center'>
                  {error || wsError || 'Ничего не найдено'}
                </p>
              </motion.div>
            )}

          <CommandList className='px-4 py-2'>
            {!error &&
              !wsError &&
              (isOnlineSearch
                ? wsResults
                : [
                    {
                      plugin: { name: '', uid: '' },
                      items: results?.items || []
                    }
                  ]
              ).map((g) => {
                return g.items.map((m) => {
                  if (m.objectType === 'media') {
                    if (m.mediaType === 'kino') {
                      return (
                        <GlobalSearchItemCard
                          {...m}
                          key={m.objectType + m.mediaType + m.id}
                          setOpen={setOpen}
                          mediaType='kino'
                        />
                      )
                    }
                  }
                  return null
                })
              })}
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
              <NumberFlow
                value={
                  (isOnlineSearch
                    ? wsResultsLength || undefined
                    : results?.total) ?? 'Infinity'
                }
              />
              {(isOnlineSearch
                ? wsResultsLength || undefined
                : results?.total) && ' совпадения'}
            </div>
          </div>

          <SkewedToggle
            checked={isOnlineSearch}
            onChange={(isOnline) => setIsOnlineHandler(isOnline)}
          />
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
