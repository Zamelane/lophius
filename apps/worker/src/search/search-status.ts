import type { ElysiaWS } from 'elysia/ws'
import type { ParserPlugin } from 'src/types'
import type { StatusUpdate } from './interfaces'

export type StatusType = 'close' | 'open' | 'completed'

type StatusUpdateData = {
  data: StatusUpdate
  plugin: {
    uid: string
    name: string
  }
}

export class SearchStatus {
  private updates: StatusUpdateData[] = []
  private wsClient: ElysiaWS | null = null
  private status: StatusType = 'open'
  private error: string | undefined = undefined

  // Устанавливаем WS клиент (при подключении)
  setClient(ws: ElysiaWS) {
    this.wsClient = ws

    // При подключении можно отправить текущие накопленные обновления
    this.wsClient.send(JSON.stringify({ type: 'init', data: this.updates }))
  }

  // Добавить новое обновление и отправить клиенту
  addUpdate(plugin: ParserPlugin, data: StatusUpdate) {
    const update = { data, plugin: { uid: plugin.uid, name: plugin.name } }
    this.updates.push(update)
    if (this.wsClient && this.wsClient.readyState === 1) {
      this.wsClient.send(JSON.stringify({ type: 'update', ...update }))
    }
  }

  setStatus(status: StatusType) {
    this.status = status

    if (status === 'close' && this.wsClient) {
      this.wsClient.send({
        status: 'completed'
      })
      this.wsClient.close()
    }
  }

  setError(error: string) {
    this.error = error
  }

  getStatus = () => this.status

  getError = () => this.error
}
