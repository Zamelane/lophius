import { languages, titles } from "@/db/tables";
import { InferSelectModel } from "drizzle-orm";

export type LoadedStatusType<T> = 
  | { raw: T; isLoaded: true }
  | { raw?: never; isLoaded: false }

export type SettedStatusType<T> = 
  | { value: T; isSetted: true }
  | { value?: never; isSetted: false }

export type TitleType = {
  mediaId: number
  code: string
  title: string
}

export type FilmType = {
  isAdult: boolean
}

/* От таблиц */
export type TitlesTableType = InferSelectModel<typeof titles>
export type LanguagesTableType = InferSelectModel<typeof languages>