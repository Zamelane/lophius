import {WithOptional} from "../../index";
import {MediaModel} from "database/models/Media/model.ts";
import {spoken_languages} from "database/schemas";
import {LanguageModel} from "database/models/Language/model.ts";

export type SpokenLanguage = typeof spoken_languages.$inferSelect
export type OptionalSpokenLanguage = WithOptional<SpokenLanguage, 'languageId' | 'mediaId'>
export type PartialSpokenLanguage = Omit<SpokenLanguage, 'languageId' | 'mediaId'> & {
	media: MediaModel
	language: LanguageModel
}