'use client'

import { Card } from '@/src/shared/ui/shadcn/card'
import { Button } from '@/src/shared/ui/shadcn/button'
import { 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Wifi, 
  WifiOff,
  RotateCw,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  Circle
} from 'lucide-react'
import { cn } from '@/src/shared/lib/utils'
import { useEffect, useState } from 'react'
import { Spinner } from '@/src/shared/ui/shadcn/spinner'
import { Progress } from '@/src/shared/ui/shadcn/progress'

type ParseStatus = 'idle' | 'parsing' | 'completed' | 'error' | 'cancelled'

export function ParseStatusCard() {
  const [status, setStatus] = useState<ParseStatus>('idle')
  const [connected, setConnected] = useState(false)
  const [stats, setStats] = useState({
    sources: 0,
    media: {
      total: 0,
      success: 0,
      errors: 0
    },
    estimatedTime: '0s',
    speed: '0 items/sec'
  })

  // Эмуляция работы парсера
  useEffect(() => {
    if (status === 'parsing') {
      setStats({
        sources: 8,
        media: {
          total: 23,
          success: 0,
          errors: 0
        },
        estimatedTime: '~1m 10s',
        speed: '0 items/sec'
      })

      let lastUpdate = Date.now()
      let processedCount = 0

      const interval = setInterval(() => {
        const now = Date.now()
        const timeDiff = (now - lastUpdate) / 1000
        processedCount++
        
        setStats(prev => {
          const remaining = prev.media.total - prev.media.success - prev.media.errors
          const shouldError = Math.random() > 0.9 && remaining > 0
          
          const newSuccess = prev.media.success + (shouldError ? 0 : 1)
          const newErrors = prev.media.errors + (shouldError ? 1 : 0)
          
          // Расчет оставшегося времени
          const remainingItems = prev.media.total - newSuccess - newErrors
          const speed = timeDiff > 0 ? (processedCount / timeDiff).toFixed(1) : '0'
          const newEstimatedTime = Math.max(0, Math.round(remainingItems / Number(speed)))
          const minutes = Math.floor(newEstimatedTime / 60)
          const seconds = newEstimatedTime % 60
          const timeStr = minutes > 0 
            ? `~${minutes}m ${seconds}s` 
            : `~${seconds}s`

          return {
            ...prev,
            media: {
              ...prev.media,
              success: newSuccess,
              errors: newErrors
            },
            estimatedTime: timeStr,
            speed: `${speed} items/sec`
          }
        })

        lastUpdate = now
        processedCount = 0
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [status])

  // Эмуляция подключения к WebSocket
  useEffect(() => {
    const timeout = setTimeout(() => {
      setConnected(true)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  const startParse = () => setStatus('parsing')
  const resetParse = () => setStatus('idle')

  const progress = status === 'parsing' || status === 'completed' 
    ? Math.round((stats.media.success + stats.media.errors) / stats.media.total * 100)
    : 0

  return (
    <Card className="w-full p-3">
      <div className="flex flex-col gap-3">
        {/* Первая строка - статус и управление */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StatusIndicator status={status} />
            <div className="flex flex-col">
              <span className="text-sm font-medium whitespace-nowrap">
                {status === 'parsing' ? 'Парсинг данных' : 
                 status === 'completed' ? 'Парсинг завершен' : 
                 status === 'error' ? 'Ошибка парсинга' : 
                 status === 'cancelled' ? 'Парсинг отменен' : 'Ожидание запуска'}
              </span>
              {status === 'parsing' && (
                <span className="text-xs text-muted-foreground">
                  {stats.speed}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status !== 'idle' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetParse}
                className="h-8 px-2 gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden md:inline">Сбросить</span>
              </Button>
            )}
            
            {status === 'idle' && (
              <Button 
                size="sm" 
                onClick={startParse}
                className="h-8 px-3 gap-1"
              >
                <RotateCw className="h-4 w-4" />
                <span className="hidden md:inline">Начать парсинг</span>
                <span className="md:hidden">Старт</span>
              </Button>
            )}
          </div>
        </div>

        {/* Прогресс бар */}
        {(status === 'parsing' || status === 'completed') && (
          <Progress value={progress} className="h-2" />
        )}

        {/* Вторая строка - статистика */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Источники */}
            <div className="flex items-center gap-1 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {status === 'parsing' || status === 'completed' ? stats.sources : '0'}
              </span>
              <span className="hidden lg:inline text-muted-foreground">источников</span>
            </div>

            {/* Медиа */}
            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">
                  {status === 'parsing' || status === 'completed' ? stats.media.success : '0'}
                </span>
                
                <span className="mx-1">/</span>
                
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">
                  {status === 'parsing' || status === 'completed' ? stats.media.errors : '0'}
                </span>
                
                <span className="mx-1">/</span>
                
                <Circle className="h-4 w-4 text-blue-500" />
                <span className="font-medium">
                  {status === 'parsing' || status === 'completed' ? stats.media.total : '0'}
                </span>
                <span className="hidden lg:inline text-muted-foreground">всего медиа</span>
              </div>
            </div>
          </div>

          {/* Время и подключение */}
          <div className="flex items-center gap-3">
            {status === 'parsing' && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{stats.estimatedTime}</span>
                <span className="hidden lg:inline">осталось</span>
              </div>
            )}

            <div className={cn(
              "flex items-center gap-1 text-sm ml-auto",
              connected ? "text-green-500" : "text-red-500"
            )}>
              {connected ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span className="hidden md:inline">WebSocket</span>
              <span className="md:hidden">WS</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function StatusIndicator({ status }: { status: ParseStatus }) {
  return (
    <div className="relative">
      {status === 'parsing' && (
        <Spinner size='sm' className='text-primary' />
      )}
      {status === 'completed' && (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      )}
      {status === 'error' && (
        <X className="h-4 w-4 text-red-500" />
      )}
      {status === 'cancelled' && (
        <X className="h-4 w-4 text-orange-500" />
      )}
      {status === 'idle' && (
        <Circle className="h-4 w-4 text-gray-400" />
      )}
    </div>
  )
}