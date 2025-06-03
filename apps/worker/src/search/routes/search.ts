import { objectTypes } from "@/src/features/media/search/types";
import { mediaTypes } from "database/src/schemas/media_types";
import { Elysia, t } from "elysia";
import { searchQueue } from "src";

export const searchRoute = new Elysia()
  .post("/search", async ({ body }): Promise<{key: string}> => {
    const { userId, data } = body;
    const key = searchQueue.registrateNewSearch({ userId, data });

    return { key };
  }, {
    body: t.Object({
      userId: t.Number(),
      data: t.Object({
        query: t.String({ minLength: 1, maxLength: 255 }),
        mediaType: t.UnionEnum(mediaTypes),
        objectType: t.UnionEnum(objectTypes),
        locale: t.String({ minLength: 2, maxLength: 2 })
      })
    })
  });