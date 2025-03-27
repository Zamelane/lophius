import {
	Transaction,
	DBConnection,
	insertTranslate
} from "@/database";

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class TranslateRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	insert = insertTranslate
}