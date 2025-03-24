import { cache } from "react";
import { languages } from "@/db/tables";
import { Language } from "@/interfaces";
import { db, eq, TransactionParam } from "@/db";

export class LanguageManager {

  /**
   * Получения языков из базы по английскому именованию
   */
  public static getAllByEnglishName = cache(async (english_name: string): Promise<Language[]> => {
    return await db.select().from(languages).where(eq(languages.english_name, english_name))
  })

  /**
   * Получение языков из базы по коду ISO_639_1
   */
  public static getAllByISO_639_1 = cache(async (iso_639_1: string): Promise<Language[]> => {
    return await db.select().from(languages).where(eq(languages.iso_639_1, iso_639_1))
  })

  /**
   * Получения одного языка из базы по английскому именованию
   */
  public static getOneByEnglishName = cache(async (english_name: string): Promise<Language|undefined> => {
    return await db.select().from(languages).where(eq(languages.english_name, english_name)).limit(1)
      .then(v => v.length ? v[0] : undefined)
  })

  /**
   * Получения одного языка из базы по коду ISO_639_1
   */
  public static getOneByISO_639_1 = cache(async (iso_639_1: string): Promise<Language|undefined> => {
    return await db.select().from(languages).where(eq(languages.iso_639_1, iso_639_1)).limit(1)
      .then(v => v.length ? v[0] : undefined)
  })

  public static create = async (data: Language & TransactionParam): Promise<Language> => {
    return await data.tx.insert(languages)
      .values(data)
      .onConflictDoUpdate({ 
        set: data,
        target: languages.iso_639_1
      })
      .returning()
      .then(v => v[0])
  }
}