import type { WithRequired } from '../../index'
import { CountryModel } from '../Country/model'
import { LanguageModel } from '../Language/model'
import { PeopleModel } from '../People/model'
import { OptionalPeopleTranslate } from './type'

export class PeopleTranslationModel implements OptionalPeopleTranslate {
  countryId?: OptionalPeopleTranslate['countryId']
  languageId?: OptionalPeopleTranslate['languageId']
  peopleId?: OptionalPeopleTranslate['peopleId']
  bio!: OptionalPeopleTranslate['bio']
  name!: OptionalPeopleTranslate['name']
  primary!: OptionalPeopleTranslate['primary']

  country?: CountryModel
  language?: LanguageModel
  people!: PeopleModel

  constructor(data: OptionalPeopleTranslate) {
    Object.assign(this, data)
    this.peopleId = data.people.id
  }

  validateRequiredModels(): asserts this is WithRequired<
      OptionalPeopleTranslate,
      'countryId' | 'languageId' | 'peopleId'
    > {
      if (this.country) {
        this.country.validateRequiredIds()!
        this.countryId = this.country.id
      }

      if (this.language) {
        this.language.validateRequiredIds()!
        this.languageId = this.language.id
      }

      if (!this.people) {
        throw new Error('PeopleTranslate [PeopleModel]: Missing required model')
      }
      
      this.peopleId = this.people.id
    }

  // validateRequiredIds(): asserts this is WithRequired<OptionalPeopleTranslate, 'id'> {
  //   if (!this.id) throw new Error('Missing required id')
  // }
}
