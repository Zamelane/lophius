import { pluginManager } from 'src'
import type { PluginQueue } from 'src/plugin-queue'
import { v4 as uuidv4 } from 'uuid'
import type { ParseRequest, Request, SearchData, SearchRequest } from './interfaces'
import { SearchStatus, type StatusType } from './search-status'
import { ParseStatus } from './parse-status'

export class SearchQueue {
  private maxConcurrent: number
  private runningCount = 0
  private queue = new Map<string, Request>()
  private queueOrder: string[] = []
  private plugins = pluginManager.getPlugins().map((p) => p.plugin)

  constructor(
    maxConcurrent: number,
    private pluginQueue: PluginQueue
  ) {
    this.maxConcurrent = maxConcurrent
  }

  registrateNewSearch({
    userId,
    data
  }: {
    userId: number
    data: SearchData
  }) {
    // Удаляем другие запросы, если они уже закрыты
    this.queue.forEach((request, key) => {
      if (request.status.getStatus() === 'close' && request.userId === userId) {
        this.queue.delete(key)
      }
    })

    // Генерируем уникальную строку-идентификатор запроса
    const key = uuidv4()

    // Сам запрос для очереди
    const request: SearchRequest = {
      data,
      userId,
      status: new SearchStatus()
    }

    // Сохраняем
    this.queue.set(key, request)
    this.queueOrder.push(key)

    this.tryProcessNext()

    return key
  }

  registrateNewParse({
    mediaId,
    userId,
    uid,
    locale
  }: {
    mediaId: number
    userId: number
    uid: string
    locale: string
  }) {
    // Удаляем другие запросы, если они уже закрыты
    this.queue.forEach((request, key) => {
      if (request.status.getStatus() === 'close' && request.userId === userId) {
        this.queue.delete(key)
      }
    })

    // Генерируем уникальную строку-идентификатор запроса
    const key = uuidv4()

    // Сам запрос для очереди
    const request: ParseRequest = {
      userId,
      mediaId,
      uid,
      locale,
      status: new ParseStatus()
    }

    // Сохраняем
    this.queue.set(key, request)
    this.queueOrder.push(key)

    this.tryProcessNext()

    return key
  }

  getStatus(key: string) {
    const status = this.queue.get(key)

    if (status) {
      return status.status
    }

    return undefined
  }

  private tryProcessNext() {
    if (this.runningCount >= this.maxConcurrent) return
    if (this.queue.size === 0) return

    const key = this.queueOrder.shift()
    const request = this.queue.get(key || '')

    if (!request) return

    this.runningCount++

    if ('mediaId' in request) {
      this.processParse(request)
        .then((value: StatusType | undefined) =>
          request.status.setStatus('close')
        )
        .catch((err) => request.status.setError(err))
        .finally(() => {
          this.runningCount--
          this.tryProcessNext()
        })
    }
    else {
      this.processSearch(request)
        .then((value: StatusType | undefined) =>
          request.status.setStatus('close')
        )
        .catch((err) => request.status.setError(err))
        .finally(() => {
          this.runningCount--
          this.tryProcessNext()
        })
    }
  }

  private async processParse(
    request: ParseRequest
  ): Promise<StatusType | undefined> {
    const { status } = request

    const allowedOnlineSearchPlugins = this.plugins.filter(
      (p) => p.parseMediaInfo !== undefined && p.uid === request.uid
    )

    const promises: Promise<void>[] = []

    allowedOnlineSearchPlugins.map((plugin) => {
      if (!plugin.parseMediaInfo) return

      const promise = plugin
        .parseMediaInfo({
          request,
          status
        })
        .catch((err) => console.log(err))
      promises.push(promise)
    })

    await Promise.all(promises)

    // На всякий який ждём отправку всех сообщений
    await Promise.all(
      allowedOnlineSearchPlugins.map((ap) =>
        this.pluginQueue.awaitPluginQueues(ap.uid)
      )
    )

    return 'close'
  }

  private async processSearch(
    request: SearchRequest
  ): Promise<StatusType | undefined> {
    const { status } = request

    const allowedOnlineSearchPlugins = this.plugins.filter(
      (p) => p.onlineSearch !== undefined
    )

    const promises: Promise<void>[] = []

    allowedOnlineSearchPlugins.map((plugin) => {
      if (!plugin.onlineSearch) return

      const promise = plugin
        .onlineSearch({
          request: request.data,
          status
        })
        .catch((err) => console.log(err))
      promises.push(promise)
    })

    await Promise.all(promises)

    // На всякий який ждём отправку всех сообщений
    await Promise.all(
      allowedOnlineSearchPlugins.map((ap) =>
        this.pluginQueue.awaitPluginQueues(ap.uid)
      )
    )

    return 'close'
  }
}
