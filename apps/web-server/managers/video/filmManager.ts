import {
  OriginCountryManager,
  ProductionCompaniesManager,
  ProductionCountriesManager,
  MediaManager
} from "@/managers"

export class FilmManager {
  public media: MediaManager

  public productionCompanies?: ProductionCompaniesManager                                    // Компании производства
  public productionCountries?: ProductionCountriesManager                                    // Страны производства
  public originCountry?:       OriginCountryManager                                          // Страны происхождения
  
  public backdropPath?: string  // ??? Мб нужно дать возможность загружать много             // Задник ?
  public posterPath?: string    // ??? Аналогично                                            // Путь до постера (можно ли посмотреть другие? если да, то нужно в массив)
  public homepage?: string                                                                   // Url-адрес домашней страницы фильма
  public isAdult: boolean = true                                                             // Пошлятина ???
  public revenue?: number                                                                    // Выручка
  public budget?: number                                                                     // Бюджет
  public vote?: Vote                                                                         // Оценка

  constructor(id?: number) {
    this.media = new MediaManager(id)
  }

  public async save() {

  }
}

type Vote = {
  average: number
  count: number
}