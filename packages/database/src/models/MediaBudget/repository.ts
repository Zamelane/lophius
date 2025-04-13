import {Transaction, DBConnection} from "../../index";
import { deleteMediaBudget, insertMediaBudget } from "./methods";

/**
 * @description Репозиторий для работы с моделью бюджетов медиа
 */
export class MediaBudgetRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	delete = deleteMediaBudget
	insert = insertMediaBudget
}