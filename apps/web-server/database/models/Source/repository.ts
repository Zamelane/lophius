import {
	Transaction,
	DBConnection
} from "@/database";
import {
	getSourceById
} from "@/database/models/Source/methods";

/**
 * @description Репозиторий для работы с моделью источников
 */
export class SourceRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	getById = getSourceById
}