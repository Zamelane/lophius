import { db, eq } from "@/db"
import { languages } from "@/db/tables"
import type { InferSelectModel } from 'drizzle-orm'

const availableChecker = (value: string|undefined|null) => (
  value ? value.length > 0 ? value : null : null
)

export class LanguageManager {
  private id?: number
  private row?: InferSelectModel<typeof languages>
  public iso_639_1    : string
  public name         : string | null
  public english_name : string | null

  constructor(language: LanguageType & LanguageArgs) {
    this.iso_639_1    = language.iso_639_1
    this.name         = availableChecker(language.name)
    this.english_name = availableChecker(language.english_name)
    this.id = language.id
  }

  /**
   * Находит в базе или сохраняет в ней
   */
  public async save() {
    let id = await this.getId()

    if (!id) {
      const result = await db.insert(languages)
        .values({
          iso_639_1:    this.iso_639_1,
          english_name: this.english_name,
          name:         this.name
        })
        .returning()

        if (result.length > 0) {
          let { id }   = result[0]
          this.row     = result[0]
          this.id      = id
        }
    }

    // Проверяем данные
    // TODO: учесть редактирование в админке и улучшить првоерку изменений
    if (
      (  !!this.english_name  != !!this.row?.english_name
      || !!this.iso_639_1     != !!this.row?.iso_639_1
      || !!this.name          != !!this.row?.name         )
      && this.id
    ) {
      const result = await db.update(languages)
       .set({
        english_name: this.english_name,
        iso_639_1:    this.iso_639_1,
        name:         this.name
      })
      .where(eq(languages.id, this.id))
      .returning()

      if (result.length > 0) {
        this.row = result[0]
      }
    }
  }

  /**
   * Возвращает id языка в базе
   * @returns 
   */
  public async getId() {
    if (!this.id) {
      const result = await db.select()
        .from(languages)
        .where(eq(languages.iso_639_1, this.iso_639_1))
      
      if (result.length > 0) {
        const { id } = result[0]
        this.row     = result[0]
        this.id      = id
      }
    }

    return this.id
  }
}

type LanguageType = {
  name?:         string | null
  english_name?: string | null
} & LanguageISO

type LanguageArgs = {
  id?: number
}

export type LanguageISO = {
  iso_639_1: string
}