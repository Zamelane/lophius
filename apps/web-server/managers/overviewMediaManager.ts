export class OverviewMediaManager {
  public readonly values: Overview[] = []

  public add(value: Overview): void {
    this.values.push(value)
  }

  public getAll(): Overview[] {
    return this.values
  }

  public remove(language: string): void {
    for (const [i, title] of this.values.entries())
      if (title.language === language) {
        this.values.splice(i, 1)
        return
      }
  }

  public update(newOverview: Overview): void {
    for (const [i, title] of this.values.entries()) {
      if (title.language === title.language) {
        this.values[i] = newOverview
        return
      }
    }
  }
}

type Overview = {
  language: string
  overview: string
}