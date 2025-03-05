import { LanguageManager } from "@/managers/utils/languageManager"

export class VideoTranslationsMagaer {
  public values: VideoTranslate[] = []

  constructor(id?: number) {
    // ! Если передан id медиа, то загружаем переводы
  }
}

type VideoTranslate = {
  translate: LanguageManager
  name: string
  overview: string | null
  homepage: string | null
  tagline:  string | null
}