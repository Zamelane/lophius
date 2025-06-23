import { objectTypes } from '@/src/features/media/search/types'
import { db, eq } from 'database'
import { medias, plugin_storage, sources } from 'database/schemas'
import { mediaTypes } from 'database/src/schemas/media_types'
import { Elysia, t } from 'elysia'
import { searchQueue } from 'src'

export const searchRoute = new Elysia().post(
  '/search',
  async ({ body }): Promise<{ key: string }> => {
    const { userId, data } = body
    const key = searchQueue.registrateNewSearch({ userId, data })

    console.log(`Registrate search key: ${key}`)

    return { key }
  },
  {
    body: t.Object({
      userId: t.Number(),
      data: t.Object({
        query: t.String({ minLength: 1, maxLength: 255 }),
        mediaType: t.UnionEnum(mediaTypes),
        objectType: t.UnionEnum(objectTypes),
        locale: t.String({ minLength: 2, maxLength: 2 })
      })
    })
  }
)
.post('/mediaParse',
  async({ body }): Promise<{ key: string } | undefined> => {
    const { userId, mediaId, locale } = body

    const [source] = await db.select({
      uid: plugin_storage.uid
    })
      .from(plugin_storage)
      .innerJoin(medias, eq(medias.sourceId, plugin_storage.sourceId))
      .where(eq(medias.id, mediaId))

    if (!source) {
      return undefined
    }

    const key = searchQueue.registrateNewParse({ userId, mediaId, uid: source.uid, locale })

    return { key }
  },
  {
    body: t.Object({
      userId: t.Number(),
      mediaId: t.Number(),
      locale: t.String({ minLength: 2, maxLength: 2 })
    })
  }
)
