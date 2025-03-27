import {WithOptional} from "@/database";
import {InferSelectModel} from "drizzle-orm";
import {languages} from "@/database/schemas";

export type Language = InferSelectModel<typeof languages>
export type OptionalLanguage = WithOptional<Language, 'id'>
export type PartialLanguage = Omit<Language, 'id'>