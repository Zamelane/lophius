export class ProductionCompaniesManager {
  public values: ProductionCompany[] = []

  public add(value: ProductionCompany): void {
    this.values.push(value);
  }

  public get(): ProductionCompany[] {
    return this.values;
  }

  public set(values: ProductionCompany[]): void {
    this.values = values;
  }
}

type ProductionCompany = {
  id: number
  logoPath: string
  name: string
  originCountry: string
}