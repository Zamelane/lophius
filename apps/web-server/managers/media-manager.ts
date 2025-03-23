import { Media, medias } from "@/db/tables/medias";
import { db, eq, and, TransactionParam } from "@/db";

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
  }): Promise<Media|undefined> {
    return await db.select()
      .from(medias)
      .where(and(
        eq(medias.external_id, external_id),
        eq(medias.sourceId, sourceId)
      ))
      .then(v => v.length ? v[0] : undefined)
  }
}