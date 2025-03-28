import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {MediaModel} from "../Media/model";
import {translates} from "../../schemas/translates";
import {CountryModel} from "../Country/model";
import {LanguageModel} from "../Language/model";

export type Translate = InferSelectModel<typeof translates>
export type OptionalTranslate = WithOptional<Translate, 'countryId' | 'id' | 'languageId' | 'mediaId'>
export type PartialTranslate = Omit<Translate, 'countryId' | 'id' | 'languageId' | 'mediaId'>
export type TranslatedModel = PartialTranslate & {
	media: MediaModel
	country?: CountryModel
	language: LanguageModel
}