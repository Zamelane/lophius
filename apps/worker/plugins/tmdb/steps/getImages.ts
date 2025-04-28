import { Context } from "@plugins/tmdb/types.ts";
import {movieImages} from "@plugins/tmdb/client";

export async function getImages(ctx: Context): Promise<Context> {
  if (!ctx.mediaModel) throw new Error("Media model missing");

  if (!ctx.fetchedData.id) throw new Error("Id is missing");

  const { data, error } = await movieImages({
    auth: ctx.token,
    path: {
      movie_id: ctx.fetchedData.id,
    },
  });

  if (error || !data)
    throw new Error(
      JSON.stringify({
        error,
        id: ctx.fetchedData.id,
      })
    );

  ctx.fetchedImagesData = data;

  return ctx;
}
