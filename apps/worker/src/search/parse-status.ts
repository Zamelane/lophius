import type { ElysiaWS } from 'elysia/ws'
import { StatusType } from './search-status'
import { ParseUpdate } from './interfaces'
import { compare, Operation } from 'fast-json-patch'

type PatchMessage = {
  type: 'patch'
  patch: Operation[]
}

export class ParseStatus {
  private patches: Operation[][] = []
  private wsClient: ElysiaWS | null = null
  private status: StatusType = 'open'
  private error: string | undefined = undefined
  private oldData: ParseUpdate = {}
  public  newData: ParseUpdate = {}

  setClient(ws: ElysiaWS) {
    this.wsClient = ws

    // При подключении отправляем все накопленные patch'и как один массив
    const mergedPatch = this.patches.flat()
    if (mergedPatch.length > 0) {
      const message: PatchMessage = { type: 'patch', patch: mergedPatch }
      this.wsClient.send(JSON.stringify(message))
    }
  }

  addPatch() {
    const patch = compare(this.oldData, this.newData)
    this.patches.push(patch)

    this.oldData = structuredClone(this.newData)

    if (this.wsClient?.readyState === 1) {
      const message: PatchMessage = { type: 'patch', patch }
      this.wsClient.send(JSON.stringify(message))
    }
  }

  setStatus(status: StatusType) {
    this.status = status
    if (status === 'close' && this.wsClient) {
      this.wsClient.send(JSON.stringify({ status: 'completed' }))
      this.wsClient.close()
    }
  }

  setError(error: string) {
    this.error = error
  }

  getStatus = () => this.status
  getError = () => this.error
}
