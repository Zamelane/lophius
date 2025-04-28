import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import { MediaModel } from "database/models/Media/model";
import { MediaStatusRepository } from "database/models/MediaStatus";
import { MediaStatusModel } from "database/models/MediaStatus/model";
import { StatusModel } from "database/models/Status/model";

export class MediaStatusService extends BaseService {
	private readonly mediaStatusRepository: MediaStatusRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.mediaStatusRepository = new MediaStatusRepository(tx)
	}

	saveStatus(media: MediaModel, status: StatusModel | undefined) {
		if (status) {
			const mediaStatusModel = new MediaStatusModel({})
			this.uow.registerOperation('insert', this.mediaStatusRepository, mediaStatusModel, status, media)
			return mediaStatusModel
		}

		this.uow.registerOperation('delete', this.mediaStatusRepository, media)
	}
}