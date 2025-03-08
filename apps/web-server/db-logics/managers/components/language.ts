import { db, eq } from "@/db";
import { languages } from "@/db/tables";

export class LanguageManager {
  static async getById(id: number) {
    return await db
      .select()
      .from(languages)
      .where(eq(languages.id, id))
      .then(v => v.length ? v[0] : null)
  }
}