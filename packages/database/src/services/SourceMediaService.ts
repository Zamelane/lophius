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
	createMediaWithOriginalTitle({
		media,
		title,
		country,
		language,
		runtime = 0,
		tagline = null,
		homepage = null,
		overview = null
	}: Pick<TranslatedModel, 'country' | 'language'> & {
		media: PartialMedia,
		title: Translate['title']
		homepage?: Translate['homepage']
		tagline?: Translate['tagline']
		runtime?: Translate['runtime']
		overview?: Translate['overview']
	}) {
		const mediaModel = new MediaModel(pickExistingByType(media, ['mediaType', 'isAdult', 'isVideo', 'external_id']))
		this.uow.registerOperation('insert', this.mediaRepository, {
			media: mediaModel,
			sourceId: this.sourceId
		})
		this.translateService.addTranslateByMedia({
			title,
			country,
			tagline,
			runtime,
			language,
			homepage,
			overview,
			isOriginal: true,
			media: mediaModel
		})
		return mediaModel
	}

	findMediaByExternalId(externalId: string) {
		return this.mediaRepository.findByExternalId(externalId, this.sourceId)
	}

	async commit() {
		await db.transaction(async (tx) => {
			this.tx = tx
			await this.uow.commit()
		}).finally(() => this.tx = db)
	}
}