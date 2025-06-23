import type { DBConnection, Transaction } from '../../index'
import {
  findExternalImageByCredentials,
  insertExternalImage,
  updateExternalImage
} from './methods'

/**
 * @description Репозиторий для работы с моделью внешних изображений
 */
export class ExternalImageRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  findByCredentials = findExternalImageByCredentials
  insert = insertExternalImage
  update = updateExternalImage
}
