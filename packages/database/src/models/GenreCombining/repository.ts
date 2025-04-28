import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью объединения жанров
 */
export class GenreCombiningRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}