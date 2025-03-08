export class FilmConstructor {
  private id?: number
  private film?: FilmType

  constructor(id?: number) {
    if (id)
      this.load(id)
  }

  public async load(id: number) {

  }

  public isLoaded() {
    return !!this.id
  }
}

export type FilmType = {
  id: number
  adult: boolean
  original_language: string
}