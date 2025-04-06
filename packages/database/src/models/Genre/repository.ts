import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью жанров
 */
export class GenreRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}