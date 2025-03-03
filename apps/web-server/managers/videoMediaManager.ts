import {TitleMediaManager} from "@/managers/titleMediaManager";
import {OverviewMediaManager} from "@/managers/overviewMediaManager";

export class VideoMediaManager {
  public externalId?: string                                                   // Идентификатор из источника
  public readonly id?: number                                                  // Идентификатор в нашей базе
  public isAdult: boolean = false                                              // Пошлятина ???
  public readonly overview?: OverviewMediaManager = new OverviewMediaManager() // Описания медиа на разных языках
  public posterPath?: string                                                   // Путь до постера (можно ли посмотреть другие? если да, то нужно в массив)
  public release_date?: Date                                                   // Дата релиза
  public readonly title?: TitleMediaManager = new TitleMediaManager()          // Названия на разных языках
  public vote?: Vote                                                           // Оценка

  constructor(id?: number) {
    // Тут загружаем информацию из нашей базы
    this.id = id
  }
}

type Vote = {
  average: number
  count: number
}