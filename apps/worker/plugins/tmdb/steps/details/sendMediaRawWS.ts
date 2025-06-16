import { MediaModel } from 'database/models/Media/model';
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = {
  request: ParseRequest
  status: ParseStatus
  mediaModel: MediaModel
}

type OutWith = InWith

export class SendMediaRawWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { mediaModel, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (!status.newData._raw) {
      status.newData._raw = {
        media: mediaModel
      }
    }

    status.addPatch()

    return ctx
  }
}