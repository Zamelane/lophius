import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {MediaModel} from "../models/Media/model";
import {CountryService} from "./CountryService";
import {CompanyService} from "./CompanyService";
import {LanguageService} from "./LanguageService";
import {TranslateService} from "./TranslateService";
import {Translate, TranslatedModel} from "../models/Translate/type";
import {ExternalBackdropService} from "./ExternalBackdropService";
import {CountryTranslationService} from "./CountryTranslationService";
import {
	db,
	SourceId,
	Transaction,
	DBConnection,
	PartialMedia,
	MediaRepository,
	pickExistingByType,
} from "../index";
import {CountryModel} from "../models/Country/model.ts";
import {LanguageModel} from "../models/Language/model.ts";

export class SourceMediaService extends BaseService {
	private readonly mediaRepository: MediaRepository

	public  readonly languageService: LanguageService
	public  readonly translateService: TranslateService
	public  readonly countryService: CountryService
	public  readonly countryTranslationService: CountryTranslationService
	public  readonly companyService: CompanyService
	public  readonly externalBackdropService: ExternalBackdropService

	constructor(
		protected sourceId: SourceId,
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.mediaRepository = new MediaRepository(tx)
		this.languageService = new LanguageService(tx, this.uow)
		this.translateService = new TranslateService(tx, this.uow)
		this.countryService = new CountryService(tx, this.uow)
		this.countryTranslationService = new CountryTranslationService(tx, this.uow)
		this.companyService = new CompanyService(tx, this.uow)
		this.externalBackdropService = new ExternalBackdropService(tx, this.uow)
	}

	/**
	 * Создаёт медиа с переданным заголовком
	 * @param media
	 * @param title
	 * @param country
	 * @param language
	 * @param runtime
	 * @param tagline
	 * @param homepage
	 * @param overview
	 */
	createMediaWithOriginalTitle(
		media: PartialMedia
	): MediaModel {
		const mediaModel = new MediaModel(pickExistingByType(media, ['mediaType', 'isAdult', 'isVideo', 'external_id']))
		this.uow.registerOperation('insert', this.mediaRepository, {
			media: mediaModel,
			sourceId: this.sourceId
		})
		return mediaModel
	}

	findMediaByExternalId(externalId: string): Promise<MediaModel|undefined> {
		return this.mediaRepository.findByExternalId(externalId, this.sourceId)
	}

	updateMedia(media: MediaModel) {
		this.uow.registerOperation('update', this.mediaRepository, media)
	}

	async commit() {
		await db.transaction(async (tx) => {
			this.tx = tx
			await this.uow.commit()
		}).finally(() => this.tx = db)
	}
}