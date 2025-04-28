import { findExternalDomainWithCredentials, insertExternalDomain } from "./methods";
import {DBConnection, Transaction} from "database/index.ts";

/**
 * @description Репозиторий для работы с моделью внешних доменов
 */
export class ExternalDomainRepository {
	constructor(protected tx: DBConnection | Transaction) {}
	

	find   = findExternalDomainWithCredentials
	insert = insertExternalDomain
}