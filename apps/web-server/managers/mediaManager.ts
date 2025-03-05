import {TitleMediaManager} from "@/managers/submanagers/titleMediaManager";
import {OverviewMediaManager} from "@/managers/submanagers/overviewMediaManager";
import {OriginCountryManager} from "@/managers/submanagers/originCountryManager";
import {ProductionCompaniesManager} from "@/managers/submanagers/productionCompaniesManager";
import {ProductionCountriesManager} from "@/managers/submanagers/productionCountriesManager";

// TODO: объединить в общий менеджер переводов (translations) заголовки, описания и прочее
export class mediaManager {
  public readonly id?: number                                                                // Идентификатор в нашей базе
  public readonly title: TitleMediaManager                                                   // Названия на разных языках
  public originCountry?: OriginCountryManager                                                // Страны происхождения
  public readonly overview?: OverviewMediaManager                                            // Описания медиа на разных языках
  public productionCompanies?: ProductionCompaniesManager                                    // Компании производства
  public productionCountries?: ProductionCountriesManager                                    // Страны производства
  public backdropPath?: string  // ??? Мб нужно дать возможность загружать много             // Задник ?
  public posterPath?: string    // ??? Аналогично                                            // Путь до постера (можно ли посмотреть другие? если да, то нужно в массив)
  public externalId?: string                                                                 // Идентификатор из источника
  public releaseDate?: Date                                                                  // Дата релиза
  public homepage?: string                                                                   // Url-адрес домашней страницы фильма
  public isAdult: boolean = true                                                             // Пошлятина ???
  public revenue?: number                                                                    // Выручка
  public budget?: number                                                                     // Бюджет
  // Для сериалов ??? -> public inProduction: boolean = false                                                       // В производстве ?
  public vote?: Vote                                                                         // Оценка

  constructor(id?: number) {
    // Тут загружаем информацию из нашей базы
    this.id = id
    this.title = new TitleMediaManager()  
  }
}

type Vote = {
  average: number
  count: number
}