import { Step } from 'src/lib/pipeline'
import { SourceMediaServiceContext } from '../types'
import { ExternalImageModel } from 'database/models/ExternalImage/model'
import { PeopleModel } from 'database/models/People/model'
import { OptionalPeople } from 'database/models/People'

type InWith = SourceMediaServiceContext & {
  people: OptionalPeople
  externalImageModel?: ExternalImageModel
}

type OutWith = InWith & {
  peopleModel: PeopleModel
}

export class SetPeopleStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    const peopleModel = ctx.sourceMediaService.createPeople({
      ...ctx.people,
      avatar: ctx.externalImageModel
    })

    return {
      ...ctx,
      peopleModel
    }
  }
}
