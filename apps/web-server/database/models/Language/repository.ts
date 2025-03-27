import {Transaction, DBConnection} from "@/database";
import {findLanguageByISO, insertLanguage} from "@/database/models/Language/methods";

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class LanguageRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	findByISO_639_1 = findLanguageByISO

	insert = insertLanguage
}