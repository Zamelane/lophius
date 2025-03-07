import { and, db, eq, notInArray } from "@/db"
import { LanguageManager } from "./languageManager"
import { countries } from "@/db/tables"
import { countryNativeNames } from "@/db/tables/media/countryNativeNames"

export class CountryManager {
  private id?: number
  public country: CountryType
  public nativeNames: NativeName[] = []
  
  constructor(country: CountryType) {
    this.country = country
  }

  public async save() {
    let id = await this.getId()

    if (!id) {
      const result = await db
        .insert(countries)
        .values({
          iso_3166_1: this.country.iso_3166_1,
          english_name: this.country.english_name
        })
        .returning()
      
      if (!result.length)
        throw new Error(`Не удалось сохранить страну`)

      const { id } = result[0]
      this.id = id
    }

    const nativeNames = this.nativeNames.map(v => v.native_name)

    // Удаляем лишниее альтернативные названия
    await db
      .delete(countryNativeNames)
      .where(
        and(
          notInArray(countryNativeNames.native_name, nativeNames),
          eq(countryNativeNames.countryId, this.id!)
        )
      )

    const alreadyExists = (await db
      .select()
      .from(countryNativeNames)
      .where(eq(countryNativeNames.countryId, this.id!)))
      .map(v => v.native_name)

    for (const alreadyName of alreadyExists) {
      const index = nativeNames.indexOf(alreadyName)
      if (index > -1)
        nativeNames.splice(index, 1)
    }

    // Сохраняем отсутствующие переводы в базе
    for (const newAlreadyName of nativeNames) {
      const language = this.nativeNames.find(v => v.native_name === newAlreadyName)?.language
      
      if (!language)
        continue

      const languageId = await language.getId()

      if (!languageId)
        continue

      await db
        .insert(countryNativeNames)
        .values({
          countryId: this.id!,
          native_name: newAlreadyName,
          languageId
        })
    }
  }

  public addNativeName(nativeName: NativeName) {
    // TODO: проверку на существование
    this.nativeNames.push(nativeName)
  }

  public async getId(): Promise<number|undefined> {
    if (this.id)
      return this.id

    const result = await db
      .select()
      .from(countries)
      .where(eq(countries.iso_3166_1, this.country.iso_3166_1))

    if (result.length) {
      const { id } = result[0]
      this.id = id
      return id
    }
  }
}

type CountryType = {
  iso_3166_1: string
  english_name: string
}

type NativeName = {
  language: LanguageManager
  native_name: string
}