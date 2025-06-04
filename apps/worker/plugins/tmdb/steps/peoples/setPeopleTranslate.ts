import { Step } from 'src/lib/pipeline'
import { SourceMediaServiceContext } from '../types'
import { PeopleModel } from 'database/models/People/model'
import { PartialPeopleTranslateWithOutModels, PartialPeopleTranslateWithOutPeople } from 'database/models/PeopleTranslation'
import { PeopleTranslationModel } from 'database/models/PeopleTranslation/model'

type InWith = SourceMediaServiceContext & {
  peopleModel: PeopleModel
  translation: PartialPeopleTranslateWithOutModels
}

type OutWith = InWith & {
  peopleTranslation: PeopleTranslationModel
}

export class SetPeopleTranslateStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    const language = ctx.translation.language
    ? ctx.sourceMediaService.languageService.createLanguage(ctx.translation.language)
    : undefined

    const country = ctx.translation.country
    ? ctx.sourceMediaService.countryService.createCountry(ctx.translation.country)
    : undefined

    const peopleTranslation = ctx.sourceMediaService.setPeopleTranslation(
      ctx.peopleModel,
      {
        ...ctx.translation,
        language,
        country
      }
    )

    return {
      ...ctx,
      peopleTranslation
    }
  }
}
