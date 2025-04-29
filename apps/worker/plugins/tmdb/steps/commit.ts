import type { Context } from '@plugins/tmdb/types.ts'

export async function commitStep(ctx: Context): Promise<Context> {
  await ctx.sourceMediaService.commit()
  return ctx
}
