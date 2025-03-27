import {
	Transaction,
	DBConnection, db
} from "@/database";
import {
	insertMedia,
	getMediaById,
	getMediaBySource
} from "@/database/models/Media/methods";

/**
 * @description Репозиторий для работы с моделью медиа
 */
export class MediaRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	getById = getMediaById

	getBySource = getMediaBySource

	insert = insertMedia
}