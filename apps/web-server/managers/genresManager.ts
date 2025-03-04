export class GenresManager {
  private values: Genre[] = [];

  public add(value: Genre): void {
    this.values.push(value)
  }

  public get(): Genre[] {
    return this.values;
  }

  public set(values: Genre[]): void {
    this.values = values;
  }
}

type Genre = {
  original_id: number
  name: string
}