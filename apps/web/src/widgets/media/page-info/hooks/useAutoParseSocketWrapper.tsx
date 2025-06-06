import { useEffect, useRef, useState, useCallback } from 'react'
import type { MediaInfoType } from '@/src/shared/types/web-types'
import { applyPatch, Operation } from 'fast-json-patch'

// Типы сообщений WebSocket
type MediaInfoPatchMessage = {
  type: 'patch'
  patch: Operation[]
}

type WebSocketMessage = MediaInfoPatchMessage

type UseMediaInfoWebSocketOptions = {
  key: string
  initialData: MediaInfoType
  onClose?: () => void
  onError?: (error: string) => void
}

export function useMediaInfoWebSocket({
  key,
  initialData,
  onClose,
  onError,
}: UseMediaInfoWebSocketOptions) {
  const [mediaInfo, setMediaInfo] = useState<MediaInfoType>(initialData)
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  const pendingPatches = useRef<Operation[][]>([])
  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const THROTTLE_MS = 100

  function applyMergedPatches() {
    setMediaInfo((prev) => {
      if (!prev || pendingPatches.current.length === 0) return prev

      // Собираем все операции в один массив
      const mergedOps = pendingPatches.current.flat()
      pendingPatches.current = []

      // Применяем все операции
      const patched = applyPatch(prev, mergedOps, /*validate*/ true).newDocument
      return patched
    })
  }

  useEffect(() => {
    if (!key) return

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/media-info?key=${key}`)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
      console.log('📡 WebSocket открыт')
    }

    ws.onerror = () => {
      setConnected(false)
      onError?.('Ошибка WebSocket подключения')
      ws.close()
    }

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data)

        if (message.type === 'patch') {
          pendingPatches.current.push(message.patch)

          if (!throttleTimeout.current) {
            throttleTimeout.current = setTimeout(() => {
              applyMergedPatches()
              throttleTimeout.current = null
            }, THROTTLE_MS)
          }
        }
      } catch (err) {
        console.error('Ошибка разбора сообщения WebSocket:', err)
      }
    }

    ws.onclose = () => {
      setConnected(false)
      onClose?.()
      console.log('🔌 WebSocket закрыт')
    }

    return () => {
      ws.close()
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current)
    }
  }, [key])

  const disconnect = useCallback(() => {
    wsRef.current?.close()
  }, [])

  return {
    mediaInfo,
    connected,
    disconnect,
  }
}
