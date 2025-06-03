import type { GlobalSearchItemCardProps } from '@/src/widgets/global-search/items/gs-card-item'
import type { MediaType } from 'database/schemas/media_types'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ObjectType } from '../../media/search/types'
import { getSearchKey } from '../services'

type PluginProps = { uid: string; name: string }

type Message =
  | { type: 'close' }
  | { type: 'update'; data: GlobalSearchItemCardProps; plugin: PluginProps }

type Status = 'connecting' | 'wait results' | 'closed'

type ResultProps = {
  items: GlobalSearchItemCardProps[]
  plugin: PluginProps
}

type Props = {
  query: string
  mediaType: MediaType
  objectType: ObjectType
}

export function useSearchWebSocket({ query, mediaType, objectType }: Props) {
  const wsRef = useRef<WebSocket | null>(null)
  const abortRef = useRef<(() => void) | null>(null)
  const [status, setStatus] = useState<Status>('closed')
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ResultProps[]>([])
  const [resultsLength, setResultsLength] = useState<number>(0)

  const connect = useCallback((): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const key = await getSearchKey(query, mediaType, objectType)
      if (!key) {
        reject(new Error('Нет ключа поиска'))
        return
      }

      setStatus('connecting')
      setError(null)
      setResults([])
      setResultsLength(0)

      const ws = new WebSocket(`ws://localhost:3002/status?key=${key}`)
      wsRef.current = ws

      ws.onopen = () => {
        setStatus('wait results')
        console.log('✅ WebSocket подключен')
      }

      ws.onerror = () => {
        setError('Ошибка подключения')
        setStatus('closed')
        ws.close()
        reject()
      }

      ws.onmessage = (event) => {
        try {
          const message: Message = JSON.parse(event.data)

          if (message.type === 'update') {
            setResults((prev) => {
              const index = prev.findIndex(
                (v) => v.plugin.uid === message.plugin.uid
              )

              if (index !== -1) {
                const existing = prev[index]

                // Проверим, нет ли уже такого элемента (по id или другому ключу)
                const alreadyExists = existing.items.some(
                  (item) => item.id === message.data.id
                )
                if (alreadyExists) return prev

                // Создаем новый объект plugin-результата с добавленным item
                const updated = {
                  ...existing,
                  items: [...existing.items, message.data]
                }

                return [
                  ...prev.slice(0, index),
                  updated,
                  ...prev.slice(index + 1)
                ]
              }

              // Новый плагин
              return [
                ...prev,
                {
                  plugin: message.plugin,
                  items: [message.data]
                }
              ]
            })
          }

          if (message.type === 'close') {
            console.log('✅ Получено сообщение CLOSE, закрываю')
            ws.close()
            resolve()
          }
        } catch (err) {
          console.error('Ошибка парсинга сообщения', err)
        }
      }

      ws.onclose = () => {
        setStatus('closed')
        console.log('🔌 WebSocket закрыт')
      }

      abortRef.current = () => {
        ws.close()
        reject()
      }
    })
  }, [query, mediaType, objectType])

  const disconnect = useCallback(() => {
    abortRef.current?.()
  }, [])

  const clearResults = () => {
    setResults([])
    setResultsLength(0)
  }

  useEffect(() => {
    const total = results.reduce(
      (acc, pluginResult) => acc + pluginResult.items.length,
      0
    )
    setResultsLength(total)
  }, [results])

  return {
    connect,
    disconnect,
    status,
    error,
    results,
    resultsLength,
    clearResults
  }
}
