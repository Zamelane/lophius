import {TitleMediaManager} from "@/managers/submanagers/titleMediaManager";
import {OverviewMediaManager} from "@/managers/submanagers/overviewMediaManager";

// TODO: объединить в общий менеджер переводов (translations) заголовки, описания и прочее
export class MediaManager {
  public readonly id?: number                         // Идентификатор в нашей базе
  // Внешние таблицы
  public readonly title: TitleMediaManager            // Названия на разных языках
  public readonly overview: OverviewMediaManager      // Описания медиа на разных языках

  // Внутренние поля
  public externalId?: string                          // Идентификатор из источника
  public releaseDate?: Date                           // Дата релиза

  constructor(id?: number) {
    // Тут загружаем информацию из нашей базы
    this.id = id
    this.title = new TitleMediaManager(id)
    this.overview = new OverviewMediaManager(id)
  }
}