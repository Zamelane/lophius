import { Elysia, t } from "elysia";
import { searchRoute } from "./search/routes/search";
import { statusRoute } from "./search/routes/ws-status";

const app = new Elysia()
  .get("/", () => ({ ok: true }))
  
  // Роут для регистрации поиска
  .use(searchRoute)

  // WS-подключение для работы с клиентами очереди
  .use(statusRoute)

export { app }
export type WorkerApp = typeof app