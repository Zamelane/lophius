import {Transaction, DBConnection} from "../../index";
import {deleteNotInBackdrops, insertBackdrop} from "database/models/ExternalBackdrop/methods.ts";

/**
 * @description Репозиторий для работы с моделью внешних задников (фоны медиа)
 */
export class ExternalBackdropRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	deleteNotIn = deleteNotInBackdrops
	insert = insertBackdrop
}