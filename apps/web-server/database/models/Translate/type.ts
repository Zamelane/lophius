import {WithOptional} from "@/database";
import {InferSelectModel} from "drizzle-orm";
import {MediaModel} from "@/database/models/Media/model";
import {translates} from "@/database/schemas/translates";
import {CountryModel} from "@/database/models/Country/model";
import {LanguageModel} from "@/database/models/Language/model";

export type Translate = InferSelectModel<typeof translates>
export type OptionalTranslate = WithOptional<Translate, 'countryId' | 'id' | 'languageId' | 'mediaId'>
export type PartialTranslate = Omit<Translate, 'countryId' | 'id' | 'languageId' | 'mediaId'>
export type TranslatedModel = PartialTranslate & {
	media: MediaModel
	country: CountryModel
	language: LanguageModel
}