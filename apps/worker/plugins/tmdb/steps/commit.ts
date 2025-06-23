import type { SourceMediaService } from 'database/src/services/SourceMediaService'
import { SourceMediaServiceContext } from './types'
import { Step } from 'src/lib/pipeline'

type InWith = SourceMediaServiceContext

type OutWith = InWith
export class CommitStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    await ctx.sourceMediaService.commit()
    return ctx
  }
}
