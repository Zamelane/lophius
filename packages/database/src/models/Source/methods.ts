import { eq } from 'drizzle-orm'
import {
  type SourceId,
  type SourceRepository,
  queryOneResult
} from '../../index'
import { sources } from '../../schemas'

/**
 * Возвращает источник по его Id
 * @param sourceId
 */
export async function getSourceById(
  this: SourceRepository,
  sourceId: SourceId
) {
  return queryOneResult(
    await this.tx.select().from(sources).where(eq(sources.id, sourceId))
  )
}
