import { Elysia } from 'elysia'
import { searchRoute } from './search/routes/search'
import { websocketApp } from './search/routes/ws-status'

const app = new Elysia()
  .get('/', () => ({ ok: true }))

  // Роут для регистрации поиска
  .use(searchRoute)

export { app, websocketApp }
export type WorkerAppHttp = typeof app
export type WorkerAppWS = typeof websocketApp
