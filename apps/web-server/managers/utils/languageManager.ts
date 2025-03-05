export class LanguageManager {
  public iso_3166_1: string
  public iso_639_1: string
  public name: string
  public english_name: string

  constructor(language: LanguageType) {
    this.iso_3166_1   = language.iso_3166_1
    this.iso_639_1    = language.iso_639_1
    this.name         = language.name
    this.english_name = language.english_name
  }

  /**
   * Сохраняет в базе или находит в ней язык и возвращает id
   * @returns id из нашей базы
   */
  public getIdFromDB() {
    return `${this.iso_639_1}_${this.iso_3166_1}`
  }
}

type LanguageType = {
  iso_3166_1: string
  iso_639_1: string
  name: string
  english_name: string
}