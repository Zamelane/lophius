import { db } from "@/db";
import { languages } from "@/db/tables";
import { LanguageManager } from "./languageManager";

export class LanguagesManager {
  /**
   * Возвращает все языки из базы
   */
  public async getAll() {
    return (await db.select().from(languages)).map(
      v => new LanguageManager({
        ...v
      })
    )
  }
}