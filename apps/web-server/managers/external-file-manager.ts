import { ExternalImage } from "@/interfaces";
import { eq, and, notInArray, TransactionParam } from "database";
import { external_posters } from "@/database/schemas/external_posters";
import { external_images, external_domains, external_backdrops } from "@/database/schemas";

type ImgType = 'backdrop' | 'poster'

export class ExternalFileManager {
  public static async AutoLink({
    tx,
    mediaId,
    imgType,
    isPartial,
    externalImagesIds
  }: TransactionParam & {
    externalImagesIds: number[]
    mediaId: number
    isPartial: boolean
    imgType: ImgType
  }) {
    const promises = []
    for (const externalImageId of externalImagesIds) {
      promises.push(this.Link({
        tx,
        imgType,
        mediaId,
        externalImageId
      }))
    }

    if (!isPartial)
      promises.push(this.RemoveIfNotInArray({
        tx,
        imgType,
        mediaId,
        externalImagesIds
      }))

    await Promise.all(promises)
  }
  public static async CreateOrUpdateFile({
    tx,
    file
  }: TransactionParam & {
    file: ExternalImage
  }) {
    return tx.insert(external_images).values({
      ...file,
      externalDomainId: await tx.select().from(external_domains).where(
        and(
          eq(external_domains.domain, file.domain),
          eq(external_domains.https, file.https)
        )
      ).then(v => {
        if (v.length)
          return v[0].id
        return tx.insert(external_domains).values({
          https: file.https,
          domain: file.domain
        }).onConflictDoNothing()
          .returning()
          .then(v=> v[0].id)
      })
    }).onConflictDoUpdate({
      set: {...file},
      target: [external_images.path, external_images.sourceId, external_images.externalDomainId]
    }).returning().then(v => v[0])
  }


  public static async Link({
    tx,
    mediaId,
    imgType,
    externalImageId
  }: TransactionParam & {
    externalImageId: number,
    mediaId: number
    imgType: ImgType
  }) {
    const table = this._getTableByType({imgType})
    return tx.insert(table).values({
      mediaId,
      externalImageId
    })
      .onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }

  public static async RemoveIfNotInArray({
    tx,
    mediaId,
    imgType,
    externalImagesIds
  }: TransactionParam & {
    mediaId: number
    externalImagesIds: number[]
    imgType: ImgType
  }) {
    const table = this._getTableByType({imgType})
    tx.delete(table).where(
      and(
        eq(table.mediaId, mediaId),
        notInArray(table.externalImageId, externalImagesIds)
      )
    )
  }

  private static _getTableByType({
    imgType
  }: {
    imgType: ImgType
  }) {
    switch (imgType) {
      case 'backdrop': return external_backdrops
      case 'poster': return external_posters
    }
  }
}