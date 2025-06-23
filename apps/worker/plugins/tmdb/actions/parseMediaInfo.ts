import type { ParseMethodArgs } from 'src/types'
import type TMDBPlugin from '..'
import { createParseMediaInfoPipeline } from '../utils/pipelineFactory'
import { SourceMediaService } from 'database/services/SourceMediaService'

export async function parseMediaInfo(
  this: TMDBPlugin,
  { status, request }: ParseMethodArgs
) {
  const data = this.storageData

  if (!data || !data.token || !this.storage.sourceId) {
    return
  }

  const service = new SourceMediaService(this.storage.sourceId)

  const mediaModel = await service.findMediaById(request.mediaId)

  if (!mediaModel) return
  
  await createParseMediaInfoPipeline(this, status, request, {
    sourceMediaService: service,
    token: this.storageData.token,
    externalId: mediaModel.external_id
  }).execute()
}