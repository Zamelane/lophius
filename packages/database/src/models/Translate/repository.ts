import {
	Transaction,
	DBConnection,
} from "../../index";
import {insertTranslate} from "database/models/Translate/methods.ts";

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class TranslateRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	insert = insertTranslate
}