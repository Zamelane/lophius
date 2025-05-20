import { Elysia, t } from "elysia";
import { searchQueue } from "src";

export const searchRoute = new Elysia()
  .post("/search", async ({ body }) => {
    const { userId, data } = body;
    const key = searchQueue.registrateNewSearch({ userId });

    return { key };
  }, {
    body: t.Object({
      userId: t.Number(),
      data: t.Any()
    })
  });