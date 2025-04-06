import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью жанра медиа
 */
export class MediaGenreRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}