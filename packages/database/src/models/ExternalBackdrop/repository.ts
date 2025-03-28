import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью внешних задников (фоны медиа)
 */
export class ExternalBackdropRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}