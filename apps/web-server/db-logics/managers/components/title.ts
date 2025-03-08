import { db, eq } from "@/db";
import { TitleConstructor } from "@/db-logics/constructors/title";
import { titles } from "@/db/tables";

export class TitleManager {
  static async loadByMediaId(id: number) {
    const result = await db
      .select()
      .from(titles)
      .where(eq(titles.mediaId, id))

    const returned = []

    for (const t of result){
      const c = new TitleConstructor()
      await c.setAlreadyLoadedTitle(t)
      
      returned.push(c)
    }

    return returned
  }
}