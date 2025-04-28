import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью переводов языков
 */
export class LanguageTranslateRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}