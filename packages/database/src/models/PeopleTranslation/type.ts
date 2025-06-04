import { PeopleTranslationsTableType } from "database/schemas"
import { LanguageModel } from "../Language/model"
import { CountryModel } from "../Country/model"
import { WithOptional } from "database/utils"
import { PeopleModel } from "../People/model"
import { PartialLanguage } from "../Language"
import { PartialCountry } from "../Country"

export type PeopleTranslate = PeopleTranslationsTableType & {
  language?: LanguageModel
  country?: CountryModel
  people: PeopleModel
}
export type OptionalPeopleTranslate = WithOptional<PeopleTranslate, 'languageId' | 'countryId' | 'peopleId'> 
export type PartialPeopleTranslate = Omit<PeopleTranslate, 'languageId' | 'countryId'>

export type PartialPeopleTranslateWithOutPeople = Omit<PeopleTranslate, 'languageId' | 'countryId' | 'peopleId' | 'people'>

export type PartialPeopleTranslateWithOutModels = Omit<PartialPeopleTranslateWithOutPeople, 'language' | 'country'> &{
  language?: PartialLanguage
  country?: PartialCountry
}