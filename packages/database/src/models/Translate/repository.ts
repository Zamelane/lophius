import {
	Transaction,
	DBConnection,
	insertTranslate
} from "../../index";

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class TranslateRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	insert = insertTranslate
}