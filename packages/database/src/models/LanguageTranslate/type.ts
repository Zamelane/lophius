import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {genres_combining} from "database/schemas";
import {language_translations} from "database/schemas/language_translations.ts";

export type LanguageTranslate = InferSelectModel<typeof language_translations>
export type OptionalLanguageTranslate = WithOptional<LanguageTranslate, 'translateValueLanguageId' | 'languageId'>
export type PartialLanguageTranslate = Omit<LanguageTranslate, 'translateValueLanguageId' | 'languageId'>