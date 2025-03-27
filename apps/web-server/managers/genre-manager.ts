import { Genre, SourceGenre } from "@/interfaces"
import { genres, mediaGenres, sourceGenres } from "@/db/tables"
import { eq, db, and, inArray, notInArray, TransactionParam } from "@/db"

export class GenreManager {
  public static async CreateSourceGenreAuto({
    tx,
    genre
  }: TransactionParam & {
    genre: Genre & SourceGenre
  }) {
    const sourceGenre = await this.FindSourceGenreByExternalId({
      sourceId: genre.sourceId,
      external_id: genre.external_id
    })

    const publicGenreId = sourceGenre
      ? sourceGenre.genreId
      : await this._createPublicGenre({
        tx,
        english_name: genre.english_name
      }).then(v => v.id)

    if (!sourceGenre) {
      await this._createSourceGenre({
        tx,
        genreId: publicGenreId,
        sourceId: genre.sourceId,
        external_id: genre.external_id
      })
    }

    return publicGenreId
  }

  public static async FindSourceGenreByExternalId({
    sourceId,
    external_id
  }: {
    external_id: string,
    sourceId: number
  }) {
    return db.select().from(sourceGenres)
      .where(
        and(
          eq(sourceGenres.sourceId, sourceId),
          eq(sourceGenres.external_id, external_id)
        )
      ).limit(1).then(v => v.length ? v[0] : undefined)
  }

  public static async LinkGenreAndMedia({
    tx,
    genreId,
    mediaId
  }: TransactionParam & {
    genreId: number
    mediaId: number
  }) {
    return tx.insert(mediaGenres).values({
      genreId,
      mediaId,
    }).onConflictDoNothing().returning().then(v => v[0])
  }

  public static async RemoveAllByMediaIdIfNotInExternalIdArray({
    tx,
    mediaId,
    externalIds
  }: TransactionParam & {
    mediaId: number
    externalIds: string[]
  }) {
    if (!externalIds.length) {
      return
    }

    await tx.delete(mediaGenres)
      .where(
        and(
          eq(mediaGenres.mediaId, mediaId),
          notInArray(
            mediaGenres.genreId,
            tx.select({ genreId: genres.id })
              .from(genres)
              .innerJoin(sourceGenres, eq(genres.id, sourceGenres.genreId))
              .where(inArray(sourceGenres.external_id, externalIds))
          )
        )
      );
  }

  private static async _createPublicGenre({
    tx,
    english_name
  }: TransactionParam & {
    english_name: string
  }) {
    return tx.insert(genres).values({ english_name })
      .onConflictDoUpdate({
        set: { english_name },
        target: genres.english_name
      })
      .returning().then(v => v[0])
  }

  private static async _createSourceGenre({
    tx,
    genreId,
    sourceId,
    external_id
  }: TransactionParam & {
    external_id: string
    genreId: number
    sourceId: number
  }) {
    return tx.insert(sourceGenres)
      .values({
        genreId,
        sourceId,
        external_id
      })
      .onConflictDoUpdate({
        target: [sourceGenres.external_id, sourceGenres.sourceId, sourceGenres.genreId],
        set: {
          genreId,
          sourceId,
          external_id
        }
      }).returning().then(v => v[0])
  }
}