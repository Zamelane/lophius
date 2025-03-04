export class ProductionCountriesManager {
  public values: ProductionCountry[] = []

  public add(values: ProductionCountry): void {
    this.values.push(values)
  }

  public get () {
    return this.values
  }

  public set (values: ProductionCountry[]) {
    this.values = values
  }
}

type ProductionCountry = {
  language: string
  name: string
}