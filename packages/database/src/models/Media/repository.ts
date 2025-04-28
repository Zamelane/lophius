import {
	Transaction,
	DBConnection
} from "../../index";
import {
	insertMedia,
	findMediaById,
	findMediaByExternalId, updateMedia
} from "./methods";

/**
 * @description Репозиторий для работы с моделью медиа
 */
export class MediaRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	findById = findMediaById

	findByExternalId = findMediaByExternalId

	insert = insertMedia
	update = updateMedia
}