import {Transaction, DBConnection} from "../../index";
import { deleteMediaStatus, insertMediaStatus } from "./methods";

/**
 * @description Репозиторий для работы с моделью статусов медиа
 */
export class MediaStatusRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	delete = deleteMediaStatus
	insert = insertMediaStatus
}