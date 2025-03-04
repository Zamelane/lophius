export class OriginCountryManager {
  private values: string[] = []

  public get() {
    return this.values;
  }

  public set(values: string[]) {
    this.values = values;
  }
}