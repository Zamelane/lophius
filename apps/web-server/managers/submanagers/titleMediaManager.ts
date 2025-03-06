import { LanguageManager } from "@/managers"

export class TitleMediaManager {
  public values: Title[] = []

  constructor(id?: number) {
    // ! Если передан id медиа, то загружаем названия
  }

  public add(value: Title) {
    this.values.push(value)
  }
}

type Title = {
  language: LanguageManager
  title: string
  isOriginal: boolean
}