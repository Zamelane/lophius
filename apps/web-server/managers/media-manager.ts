import { db, eq, and, TransactionParam } from "database";
import { Media, medias, MediasTableType } from "@/database/schemas/medias";

export class MediaManager {
  public static async create({
    tx,
    data
  }: {data: Media } & TransactionParam) {
    return await tx.insert(medias)
      .values(data)
      .onConflictDoUpdate({ set: data, target: [medias.sourceId, medias.external_id] })
      .returning()
      .then(v => v[0])
  }

  public static async getByExternalId({
    sourceId,
    external_id
  }: {
    external_id: string,
    sourceId: number
  }): Promise<MediasTableType|undefined> {
    return await db.select()
      .from(medias)
      .where(and(
        eq(medias.external_id, external_id),
        eq(medias.sourceId, sourceId)
      ))
      .then(v => v.length ? v[0] : undefined)
  }

  public static async getByMediaId({
    mediaId
  }: {
    mediaId: number
  }) {
    return await db.select()
      .from(medias)
      .where(eq(medias.id, mediaId))
      .limit(1)
      .then(v => v.length ? v[0] : undefined)
  }

  public static async update({
    tx,
    data,
    mediaId
  }: TransactionParam & {
    data: Media
    mediaId: number
  }) {
    return tx.update(medias)
      .set({
        ...data
      }).where(eq(medias.id, mediaId))
      .returning()
      .then(v => v[0])
  }
}