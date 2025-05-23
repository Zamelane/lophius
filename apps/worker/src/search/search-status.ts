import { StatusUpdate } from "./interfaces";
import { ElysiaWS } from "elysia/ws";

export type StatusType = 'close' | 'open' | 'completed'

export class SearchStatus {
  private updates: StatusUpdate[] = [];
  private wsClient: ElysiaWS | null = null;
  private status: StatusType = 'open'
  private error: string | undefined = undefined

  constructor() {}

  // Устанавливаем WS клиент (при подключении)
  setClient(ws: ElysiaWS) {
    this.wsClient = ws;

    // При подключении можно отправить текущие накопленные обновления
    this.wsClient.send(JSON.stringify({ type: 'init', data: this.updates }));
  }

  // Добавить новое обновление и отправить клиенту
  addUpdate(update: StatusUpdate) {
    this.updates.push(update);
    if (this.wsClient && this.wsClient.readyState === 1) {
      this.wsClient.send(JSON.stringify({ type: 'update', data: update }));
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