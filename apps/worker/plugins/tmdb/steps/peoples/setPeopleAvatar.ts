import { OptionalExternalImage, type PartialExternalDomain } from 'database'
import { Step } from 'src/lib/pipeline'
import { SourceMediaServiceContext } from '../types'
import { ExternalImageModel } from 'database/models/ExternalImage/model'
import { PeopleModel } from 'database/models/People/model'

const imageCDN = 'https://image.tmdb.org/t/p/original'
const subPath = '/t/p/original'

type InWith = SourceMediaServiceContext
& {
  avatar?: OptionalExternalImage
  peopleModel: PeopleModel
}

type OutWith = InWith & {
  externalImageModel?: ExternalImageModel
}
export class SetPeopleAvatarStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.avatar) {
      return ctx
    }

    const externalImageModel = await ctx.sourceMediaService.createExternalImage({
      ...ctx.avatar,
      language: null,
      externalDomain: this.getDomainByUrl(imageCDN) 
    })

    ctx.peopleModel.avatar = externalImageModel

    return {
      ...ctx,
      externalImageModel
    }
  }

  getDomainByUrl(url: string): PartialExternalDomain {
    const urlOBJ = new URL(url)
    return {
      domain: urlOBJ.hostname,
      https: urlOBJ.protocol === 'https'
    }
  }
}
