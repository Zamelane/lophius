import { LanguageManager } from "../utils/languageManager"

export class TaglineManager {
  public values: Tagline[]
  
  constructor(id?: number) {
    this.values = []
  }
}

type Tagline = {
  language: LanguageManager
  tagline: string
}