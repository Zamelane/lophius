import {UoW} from "@/database/services/UnitOfWorks";
import {BaseService} from "@/database/services/types";
import {MediaModel} from "@/database/models/Media/model";
import {CountryService} from "@/database/services/CountryService";
import {LanguageService} from "@/database/services/LanguageService";
import {TranslateService} from "@/database/services/TranslateService";
import {Translate, TranslatedModel} from "@/database/models/Translate/type";
import {
	db,
	SourceId,
	Transaction,
	DBConnection,
	PartialMedia,
	MediaRepository,
	pickExistingByType,
} from "@/database";

export class SourceMediaService extends BaseService {
	private readonly mediaRepository: MediaRepository

	public  readonly languageService: LanguageService
	public  readonly translateService: TranslateService
	public  readonly countryService: CountryService

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

	async commit() {
		await db.transaction(async (tx) => {
			try {
				this.tx = tx
				await this.uow.commit()
			} catch (error) {
				console.log(error)
				tx.rollback()
			}
		}).finally(() => this.tx = db)
	}
}