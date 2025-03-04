import {TitleMediaManager} from "@/managers/titleMediaManager";
import {OverviewMediaManager} from "@/managers/overviewMediaManager";
import {OriginCountryManager} from "@/managers/originCountryManager";
import {ProductionCompaniesManager} from "@/managers/productionCompaniesManager";
import {ProductionCountriesManager} from "@/managers/productionCountriesManager";

// TODO: объединить в общий менеджер переводов (translations) заголовки, описания и прочее
export class VideoMediaManager {
  public backdrop_path?: string                                                              // Задник ?
  public budget?: number                                                                     // Бюджет
  public externalId?: string                                                                 // Идентификатор из источника
  public homepage?: string                                                                   // Url-адрес домашней страницы фильма
  public readonly id?: number                                                                // Идентификатор в нашей базе
  // Для сериалов ??? -> public inProduction: boolean = false                                                       // В производстве ?
  public isAdult: boolean = true                                                             // Пошлятина ???
  public originCountry?: OriginCountryManager = new OriginCountryManager()                   // Страны происхождения
  public readonly overview?: OverviewMediaManager = new OverviewMediaManager()               // Описания медиа на разных языках
  public posterPath?: string                                                                 // Путь до постера (можно ли посмотреть другие? если да, то нужно в массив)
  public productionCompanies?: ProductionCompaniesManager = new ProductionCompaniesManager() // Компании производства
  public productionCountries?: ProductionCountriesManager = new ProductionCountriesManager() // Страны производства
  public releaseDate?: Date                                                                  // Дата релиза
  public revenue?: number                                                                    // Выручка
  public readonly title?: TitleMediaManager = new TitleMediaManager()                        // Названия на разных языках
  public vote?: Vote                                                                         // Оценка

  constructor(id?: number) {
    // Тут загружаем информацию из нашей базы
    this.id = id
  }
}

type Vote = {
  average: number
  count: number
}