import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {countryTranslations} from "../../schemas";
import {CountryModel} from "../Country/model";
import {LanguageModel} from "../Language/model";

export type CountryTranslation = InferSelectModel<typeof countryTranslations>
export type OptionalCountryTranslation = WithOptional<CountryTranslation, 'countryId' | 'languageId'>
export type PartialCountryTranslation = Omit<CountryTranslation, 'countryId' | 'languageId'> & {
	language: LanguageModel
	country: CountryModel
}