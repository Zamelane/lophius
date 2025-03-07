import { LanguageManager } from "../utils"

export class OverviewMediaManager {
  public values: Overview[] = []

  constructor(id?: number) {
    
  }

  /**
   * Добавляет описание для заданного языка
   * Дополнительно проверяет, чтобы язык не повторялся (в случае повторения - обновляет запись)
   * @param value 
   * @returns 
   */
  public add(value: Overview) {
    for (const [i, overview] of this.values.entries()){
      if (overview.language === value.language) {
        this.values[i] = value
        return
      }
    }
    this.values.push(value)
  }

  // public add(value: Overview): void {
  //   this.values.push(value)
  // }

  // public getAll(): Overview[] {
  //   return this.values
  // }

  // public remove(language: string): void {
  //   for (const [i, title] of this.values.entries())
  //     if (title.language === language) {
  //       this.values.splice(i, 1)
  //       return
  //     }
  // }

  // public update(newOverview: Overview): void {
  //   for (const [i, title] of this.values.entries()) {
  //     if (title.language === title.language) {
  //       this.values[i] = newOverview
  //       return
  //     }
  //   }
  // }
}

type Overview = {
  language: LanguageManager
  overview: string
}