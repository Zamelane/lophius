export class OriginCountryManager {
  public values: Country[] = []
}

type Country = {
  id?: number
  iso_3166_1: string
  english_name: string
  native_name: string
}