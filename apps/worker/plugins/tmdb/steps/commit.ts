import { SourceMediaService } from 'database/src/services/SourceMediaService'
export class CommitStep<T extends { sourceMediaService: SourceMediaService }> {
  async execute(ctx: T): Promise<T> {
    await ctx.sourceMediaService.commit()
    return ctx
  }
}