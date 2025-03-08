import { LanguageManager } from "../managers/components/language";
import { LanguagesTableType, LoadedStatusType, SettedStatusType, TitlesTableType, TitleType } from "../types";

export class TitleConstructor {
  private data: LoadedStatusType<TitlesTableType>
  & SettedStatusType<TitleType> = {
    isLoaded: false,
    isSetted: false
  }

  private language: LoadedStatusType<LanguagesTableType> = {
    isLoaded: false
  }

  /**
   * Загружает данные о заголовке из базы
   * @param id - идентификатор перевода в базе
   */
  // public async load(id: number) {

  // }

  /**
   * Устанавливает уже загруженные данные из БД в конструктор
   * @param value 
   */
  public async setAlreadyLoadedTitle(raw: TitlesTableType) {
    if (
      !this.language.isLoaded ||
      this.language.raw.id !== raw.languageId
    ) {
      const language = await LanguageManager
        .getById(raw.languageId)

        if (language){
          this.language = {
            isLoaded: true,
            raw: language
          }
        }
    }
    this.data = {
      ...this.data,
      isLoaded: true,
      raw
    }

    if (this.language.isLoaded)
      this.data = {
        ...this.data,
        isSetted: true,
        value: {
          ...this.language.raw,
          ...raw
        }
      }
  }

  /**
   * Загружена ли информация из базы (или сохранена ли в ней, если создаётся впервые)
   * @returns boolean - загружен ли из базы на данный момент
   */
  public isLoaded() {
    return this.data.isLoaded;
  }

  /**
   * Задаёт данные для сохранения
   * @param value - Вся информация о заголовке
   */
  public set(value: TitleType) {
    this.data = {
      ...this.data,
      isSetted: true,
      value
    };
  }

  /**
   * Редактирует код языка заголовка
   * @param code - новый код языка, например 'ru', 'en' и т.д.
   * @returns boolean - было ли выполнено редактирование (без сохранения в базе)
   */
  public editCode(code: string) {
    if (!this.data.isSetted)
      return false

    this.data.value.code = code
    return true
  }

  /**
   * Редактирует заголовок
   * @param title - новый заголовок
   * @returns boolean - было ли выполнено редактирование (без сохранения в базе)
   */
  public editTitle(title: string) {
    if (!this.data.isSetted)
      return false

    this.data.value.title = title
    return true
  }

  public save() {
    
  }
}