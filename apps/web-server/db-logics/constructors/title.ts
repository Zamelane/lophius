export class TitleConstructor {
  private id?: number
  private data?: TitleType

  constructor(id?: number) {

  }

  /**
   * Загружает данные о заголовке из базы
   * @param id - идентификатор перевода в базе
   */
  public async load(id?: number) {

  }

  /**
   * Загружена ли информация из базы (или сохранена ли в ней, если создаётся впервые)
   * @returns boolean - загружен ли из базы на данный момент
   */
  public isLoaded() {
    return !!this.id;
  }

  /**
   * Задаёт данные для сохранения
   * @param value - Вся информация о заголовке
   */
  public set(value: TitleType) {
    this.data = value;
  }

  /**
   * Редактирует код языка заголовка
   * @param code - новый код языка, например 'ru', 'en' и т.д.
   * @returns boolean - было ли выполнено редактирование (без сохранения в базе)
   */
  public editCode(code: string) {
    if (!this.data)
      return false

    this.data.code = code
    return true
  }

  /**
   * Редактирует заголовок
   * @param title - новый заголовок
   * @returns boolean - было ли выполнено редактирование (без сохранения в базе)
   */
  public editTitle(title: string) {
    if (!this.data)
      return false

    this.data.title = title
    return true
  }

  public save() {
    
  }
}

export type TitleType = {
  code: string
  title: string
}