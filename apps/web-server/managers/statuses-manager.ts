import { db, eq, TransactionParam } from "database";
import { media_statuses, StatusesEnumType } from "@/database/schemas";

export class StatusesManager {
  public static async CreateStatusByMediaId({
    tx,
    status,
    mediaId
  }: TransactionParam & {
    mediaId: number
    status: StatusesEnumType
  }) {
    tx.insert(media_statuses).values({
      status,
      mediaId
    }).onConflictDoUpdate({
      set: {status},
      target: [media_statuses.mediaId]
    })
      .returning().then(v => v[0])
  }

  public static async DeleteStatusByMEdiaId({
    tx,
    mediaId
  }: TransactionParam & {
    mediaId: number
  }) {
    await tx.delete(media_statuses).where(eq(media_statuses.mediaId, mediaId))
  }

  public static async GetStatusByMediaId({
    mediaId
  }: {
    mediaId: number
  }) {
    return await db.select()
      .from(media_statuses)
      .where(eq(media_statuses.mediaId, mediaId))
      .limit(1).then(v => v.length ? v[0] : undefined)
  }

  public static async SaveStatusByMedia({
    tx,
    status,
    mediaId
  }: TransactionParam & {
    mediaId: number
    status: null | StatusesEnumType
  }) {
    const existStatus = await this.GetStatusByMediaId({
      mediaId
    })

    if (existStatus) {
      if (existStatus.status !== status) {
        if (status) {
          await this.UpdateStatusByMediaId({
            tx,
            status,
            mediaId
          })
        } else {
          await this.DeleteStatusByMEdiaId({
            tx,
            mediaId
          })
        }
      }
      return {
        ...existStatus,
        status
      }
    }

    if (status)
      return await this.CreateStatusByMediaId({
        tx,
        status,
        mediaId
      })
  }

  public static async UpdateStatusByMediaId({
    tx,
    status,
    mediaId
  }: TransactionParam & {
    mediaId: number
    status: StatusesEnumType
  }) {
    return tx.update(media_statuses)
      .set({
        status
      })
      .where(eq(media_statuses.mediaId, mediaId))
      .returning()
      .then(v => v.length ? v[0] : undefined)
  }
}