import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import { MediaModel } from "database/models/Media/model";
import { MediaRevenue, MediaRevenueRepository } from "database/models/MediaRevenue";
import { MediaRevenueModel } from "database/models/MediaRevenue/model";

export class MediaRevenueService extends BaseService {
	private readonly mediaRevenueRepository: MediaRevenueRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.mediaRevenueRepository = new MediaRevenueRepository(tx)
	}

	saveRevenue(media: MediaModel, revenue: MediaRevenue['revenue'] | undefined) {
		if (revenue) {
			const mediaRevenueModel = new MediaRevenueModel({ revenue })
			this.uow.registerOperation('insert', this.mediaRevenueRepository, mediaRevenueModel, media)
			return mediaRevenueModel
		}

		this.uow.registerOperation('delete', this.mediaRevenueRepository, media)
	}
}