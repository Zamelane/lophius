import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью внешних изображений
 */
export class ExternalPosterRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}