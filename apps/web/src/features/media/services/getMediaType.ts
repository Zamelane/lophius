import { db, eq } from "database";
import { medias } from "database/schemas";
import { MediaType } from "database/schemas/media_types";

export async function getMediaType(mediaId: number): Promise<MediaType | undefined> {
  return (await db.select({ mediaType: medias.mediaType })
    .from(medias)
    .where(eq(medias.id, mediaId)))?.[0].mediaType
}