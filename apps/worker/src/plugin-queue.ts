import { pluginManager } from "src"
import { ParserPlugin } from "./types"

type Task<T> = {
  action: () => Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export class PluginQueue {
  private queue = new Map<string, {
    plugin: ParserPlugin
    runningCount: number
    taskQueue: Task<any>[]
    concurrency: number
    requestTimestamps: number[]
    waiting: boolean
  }>()

  constructor() {}

  addAction<T>(uid: string, action: () => Promise<T>): Promise<T> {
    let pluginQueue = this.queue.get(uid)

    if (!pluginQueue) {
      const plugin = pluginManager.getPlugins().find(p => p.plugin.uid === uid)?.plugin
      if (!plugin) throw new Error(`There is no plugin with uid ${uid}`)

      if (!plugin.onlineSearch) {
        return action()
      }

      pluginQueue = {
        plugin,
        runningCount: 0,
        taskQueue: [],
        concurrency: plugin.concurrent,
        requestTimestamps: [],
        waiting: false
      }

      this.queue.set(uid, pluginQueue)
    }

    return new Promise<T>((resolve, reject) => {
      pluginQueue!.taskQueue.push({ action, resolve, reject })
      this.tryRunNext(uid)
    })
  }

  private tryRunNext(uid: string) {
    const pluginQueue = this.queue.get(uid)
    if (!pluginQueue) return

    const { plugin, taskQueue, concurrency, requestTimestamps } = pluginQueue

    const now = Date.now()
    const minuteAgo = now - 60_000

    // Удаляем устаревшие запросы
    pluginQueue.requestTimestamps = requestTimestamps.filter(ts => ts > minuteAgo)

    const maxRequests = plugin.maxInMinute ?? Infinity

    // Если достигнут лимит запросов в минуту
    if (pluginQueue.requestTimestamps.length >= maxRequests) {
      if (!pluginQueue.waiting) {
        pluginQueue.waiting = true

        const earliest = pluginQueue.requestTimestamps[0]
        const waitTime = Math.max(0, 60_000 - (now - earliest))

        setTimeout(() => {
          pluginQueue.waiting = false
          this.tryRunNext(uid)
        }, waitTime)
      }

      return
    }

    while (
      pluginQueue.runningCount < concurrency &&
      taskQueue.length > 0 &&
      pluginQueue.requestTimestamps.length < maxRequests
    ) {
      const task = taskQueue.shift()
      if (!task) continue

      pluginQueue.runningCount++
      pluginQueue.requestTimestamps.push(Date.now())

      task.action()
        .then(task.resolve)
        .catch(task.reject)
        .finally(() => {
          pluginQueue!.runningCount--
          this.tryRunNext(uid)
        })
    }
  }
}
