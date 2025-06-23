import type { DBConnection, Transaction } from '../../index'
import { deleteNotInLogos, insertLogo } from './methods'

/**
 * @description Репозиторий для работы с моделью внешних логотипов
 */
export class ExternalLogoRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  deleteNotIn = deleteNotInLogos
  insert = insertLogo
}
