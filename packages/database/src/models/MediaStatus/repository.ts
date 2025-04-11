import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью статусов медиа
 */
export class MediaRevenueRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}