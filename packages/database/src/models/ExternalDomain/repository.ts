import {Transaction, DBConnection} from "../../index";
import { findExternalDomainWithCredentionals, insertExternalDomain } from "./methods";

/**
 * @description Репозиторий для работы с моделью внешних доменов
 */
export class ExternalDomainRepository {
	constructor(protected tx: DBConnection | Transaction) {}
	

	find   = findExternalDomainWithCredentionals
	insert = insertExternalDomain
}