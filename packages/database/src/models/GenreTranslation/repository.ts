import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью переводов жанров
 */
export class GenreTranslationRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}