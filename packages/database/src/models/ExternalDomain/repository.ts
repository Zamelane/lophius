import type { DBConnection, Transaction } from 'database/index.ts'
import {
  findExternalDomainWithCredentials,
  insertExternalDomain
} from './methods'

/**
 * @description Репозиторий для работы с моделью внешних доменов
 */
export class ExternalDomainRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  find = findExternalDomainWithCredentials
  insert = insertExternalDomain
}
