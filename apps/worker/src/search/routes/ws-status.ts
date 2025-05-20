import { Elysia, t } from "elysia";
import { searchQueue } from "src";

export const statusRoute = new Elysia()
  .ws("/status", {
    open(ws) {
      const key = ws.data.query.key;

      if (!key) {
        ws.send({ type: 'error', message: 'Missing key' });
        ws.close();
        return;
      }

      const status = searchQueue.getStatus(key);
      if (!status) {
        ws.send({ type: 'error', message: 'Invalid key' });
        ws.close();
        return;
      }

      status.setClient(ws);
    },

    message(ws, message) {
      // Логируем входящие сообщения
      console.log("Received from client:", message);

      if (message === 'status') {
        return getStatus(ws.data.query.key)
      }
    },

    // Токен поиска
    query: t.Object({
      key: t.String()
    })
  });

function getStatus(key: string) {
  return searchQueue.getStatus(key)?.getStatus()
}