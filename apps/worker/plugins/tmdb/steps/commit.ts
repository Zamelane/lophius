import type { Context } from '@plugins/tmdb/types.ts'

export class CommitStep {
  async execute(ctx: Context): Promise<Context> {
    await ctx.sourceMediaService.commit()
    return ctx
  }
}