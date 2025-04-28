import {Transaction, DBConnection} from "../../index";
import { insertStatus } from "./methods";

/**
 * @description Репозиторий для работы с моделью статусов
 */
export class StatusRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	insert = insertStatus
}