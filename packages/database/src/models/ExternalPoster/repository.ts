import {Transaction, DBConnection} from "../../index";
import {deleteNotInPoster, insertPoster} from "database/models/ExternalPoster/methods.ts";

/**
 * @description Репозиторий для работы с моделью внешних изображений
 */
export class ExternalPosterRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	deleteNotIn = deleteNotInPoster
	insert = insertPoster
}