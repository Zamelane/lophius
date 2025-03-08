import { db, eq } from "@/db"
import {
  TitleManager,
  SettedStatusType,
  TitleConstructor,
  FilmType,
  LoadedStatusType
} from "@/db-logics"
import { medias } from "@/db/tables"

export class FilmConstructor {
  private data: SettedStatusType<FilmType> 
  & LoadedStatusType<FilmType> = {
    isLoaded: false,
    isSetted: false
  }
  private titles: SettedStatusType<TitleConstructor[]> = {
    isSetted: false
  }

  public async load(id: number) {
    if (
      !(await this.loadTitles(id)) ||
      !(await this.loadSelfData(id))
    ) return false

    return true
  }

  /* ВСПОМОГАТЕЛЬНЫЕ */

  private async loadSelfData(id: number) {
    const data = await db
      .select()
      .from(medias)
      .where(eq(medias.id, id))
      .then(v => v.length ? v[0] : undefined)
      .catch(() => undefined)

      if (data !== undefined)
        this.data = {
          ...this.data,
          isSetted: true,
          value: {
            ...data
          }
        }
    return data !== undefined
  }

  private async loadTitles(id: number): Promise<boolean> {
    // Загружаем заголовки текущего медиа
    const titles = await TitleManager
      .loadByMediaId(id)
      .catch(() => undefined)

    // Если небыло ошибок, то ставим статус успешности
    if (titles !== undefined)
      this.titles = {
        isSetted: true,
        value: titles
      }
    
    return titles !== undefined
  }
}