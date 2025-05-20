import { v4 as uuidv4 } from 'uuid';
import { SearchData, SearchRequest } from './interfaces';
import { SearchStatus, StatusType } from './search-status';
import { pluginManager } from 'src';
import { PluginStorage } from 'src/plugin-storage';

export class SearchQueue {
  private maxConcurrent: number;
  private runningCount = 0;
  private queue = new Map<string, SearchRequest>()
  private queueOrder: string[] = []
  private plugins = pluginManager.getPlugins().map(p => p.plugin)

  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent;
  }

  registrateNewSearch({
    userId
  }: {
    userId: number
  }) {
    // Удаляем другие запросы, если они уже закрыты
    this.queue.forEach((request, key) => {
      if (
        request.status.getStatus() === 'close'
        && request.userId === userId
      ) {
        this.queue.delete(key)
      }
    })

    // Генерируем уникальную строку-идентификатор запроса
    const key = uuidv4();

    // Сам запрос для очереди
    const request: SearchRequest = {
      data: {},
      userId,
      status: new SearchStatus()
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
    if (this.runningCount >= this.maxConcurrent) return;
    if (this.queue.size === 0) return;

    const key = this.queueOrder.shift()
    const request = this.queue.get(key || "")

    if (!request)
      return

    this.runningCount++


    this.processSearch(request)
      .then((value: StatusType | undefined) => request.status.setStatus('close'))
      .catch(err => request.status.setError(err))
      .finally(() => {
        this.runningCount--
        this.tryProcessNext()
      })
  }

  private async processSearch(request: SearchRequest): Promise<StatusType | undefined> {
    const { status } = request

    const allowedOnlineSearchPlugins = this.plugins.filter(p => p.onlineSearch !== undefined)

    const promises: Promise<void>[] = []

    allowedOnlineSearchPlugins.map(plugin => {
      const promise = plugin.onlineSearch({
        storage: new PluginStorage(plugin.name),
        request: request.data,
        status
      }).catch(err => console.log(err))
      promises.push(promise)
    })

    await Promise.all(promises)

    return 'close'
  }
}