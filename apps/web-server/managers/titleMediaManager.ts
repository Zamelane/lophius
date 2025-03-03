export class TitleMediaManager {
  public readonly values: Title[] = []

  public add(value: Title): void {
    this.values.push(value)
  }

  public getAll(): Title[] {
    return this.values
  }

  public remove(language: string): void {
    for (const [i, title] of this.values.entries())
      if (title.language === language) {
        this.values.splice(i, 1)
        return
      }
  }

  public update(newTitle: Title): void {
    for (const [i, title] of this.values.entries()) {
      if (title.language === title.language) {
        this.values[i] = newTitle
        return
      }
    }
  }
}

type Title = {
  language: string
  title: string
  isOriginal: boolean
}