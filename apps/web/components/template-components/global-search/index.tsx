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
  Search,
  type SearchResultType
} from '@/actions/server/media/other/search'
import { limitResults } from '@/actions/server/media/other/search/config'
import { Tab, Tabs } from '@/components/me-ui/tabs'
import { useDebounce } from '@/hooks/debounce'
import type { LayoutProps } from '@/interfaces'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { SkewedToggle } from '../../me-ui/skewed-toggle'
import { Button } from '../../shadcn/ui/button'
import {
  CommandDialog,
  CommandInput,
  CommandList
} from '../../shadcn/ui/command'
import { DialogTitle } from '../../shadcn/ui/dialog'
import { Spinner } from '../../shadcn/ui/spinner'
import { VideoItem } from './items/video-item'

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

  return (
    <AnimatePresence>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <DialogTitle className='hidden'>Окно поиск</DialogTitle>
        <CommandInput
          placeholder='Введите для поиска...'
          value={searchQuery}
          onValueChange={setSearchQuery}
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

          {(!results?.current || error) && !isLoading && (
            <motion.div
              key='empty'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className='h-full flex flex-col justify-center items-center'
            >
              <p className='text-center'>
                {error ? error : 'Ничего не найдено'}
              </p>
            </motion.div>
          )}

          <CommandList className='px-4 py-2'>
            {!error &&
              results?.items.map((m) => {
                if (m.objectType === 'media') {
                  if (m.mediaType === 'kino') {
                    return (
                      <VideoItem
                        m={m}
                        key={m.objectType + m.mediaType + m.id}
                        setOpen={setOpen}
                      />
                    )
                  }
                }

                return null
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
              <NumberFlow value={results?.total ?? 'Infinity'} />
              {results && ' совпадения'}
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
