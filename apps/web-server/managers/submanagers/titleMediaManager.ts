import { LanguageManager } from "../utils/languageManager"

export class TitleMediaManager {
  public values: Title[] = []

  constructor(id?: number) {
    // ! Если передан id медиа, то загружаем названия
  }
}

type Title = {
  language: LanguageManager
  title: string
  isOriginal: boolean
}