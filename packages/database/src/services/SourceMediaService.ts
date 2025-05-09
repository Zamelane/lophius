import {
  type DBConnection,
  type MediaBudget,
  MediaRepository,
  type PartialExternalImage,
  type PartialGenre,
  type PartialMedia,
  type SourceId,
  type Transaction,
  db,
  pickExistingByType
} from 'database'
import type { ExternalBackdropModel } from 'database/models/ExternalBackdrop/model.ts'
import type { ExternalLogoModel } from 'database/models/ExternalLogo/model'
import type { ExternalPosterModel } from 'database/models/ExternalPoster/model.ts'
import type { GenreModel } from 'database/models/Genre/model'
import type { MediaRevenue } from 'database/models/MediaRevenue'
import { ExternalPosterService } from 'database/services/ExternalPosterService.ts'
import { MediaModel } from '../models/Media/model'
import { CompanyService } from './CompanyService'
import { CountryService } from './CountryService'
import { CountryTranslationService } from './CountryTranslationService'
import { ExternalBackdropService } from './ExternalBackdropService'
import { ExternalDomainService } from './ExternalDomainService'
import { ExternalImageService } from './ExternalImageService'
import { ExternalLogoService } from './ExternalLogoService'
import { GenreService } from './GenreService'
import { LanguageService } from './LanguageService'
import { MediaBudgetService } from './MediaBudgetService'
import { MediaGenreService } from './MediaGenreService'
import { MediaRevenueService } from './MediaRevenueService'
import { MediaStatusService } from './MediaStatusService'
import { StatusService } from './StatusService'
import { TranslateService } from './TranslateService'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class SourceMediaService extends BaseService {
  private readonly mediaRepository: MediaRepository

  public readonly languageService: LanguageService
  public readonly translateService: TranslateService
  public readonly countryService: CountryService
  public readonly countryTranslationService: CountryTranslationService
  public readonly companyService: CompanyService
  public readonly externalBackdropService: ExternalBackdropService
  public readonly externalDomainService: ExternalDomainService
  public readonly externalImageService: ExternalImageService
  public readonly externalPosterService: ExternalPosterService
  public readonly externalLogoService: ExternalLogoService
  public readonly genreService: GenreService
  public readonly mediaGenreService: MediaGenreService
  public readonly mediaBudgetService: MediaBudgetService
  public readonly mediaStatusService: MediaStatusService
  public readonly statusService: StatusService
  public readonly mediaRevenueService: MediaRevenueService

  constructor(
    protected sourceId: SourceId,
    tx?: DBConnection | Transaction,
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
    this.externalDomainService = new ExternalDomainService(
      sourceId,
      tx,
      this.uow
    )
    this.externalImageService = new ExternalImageService(sourceId, tx, this.uow)
    this.externalPosterService = new ExternalPosterService(tx, this.uow)
    this.externalLogoService = new ExternalLogoService(tx, this.uow)
    this.genreService = new GenreService(tx, this.uow)
    this.mediaGenreService = new MediaGenreService(tx, this.uow)
    this.mediaBudgetService = new MediaBudgetService(tx, this.uow)
    this.mediaStatusService = new MediaStatusService(tx, this.uow)
    this.statusService = new StatusService(tx, this.uow)
    this.mediaRevenueService = new MediaRevenueService(tx, this.uow)
  }

  /**
   * Создаёт медиа с переданным заголовком
   * @param media
   */
  createMediaWithOriginalTitle(media: PartialMedia): MediaModel {
    const mediaModel = new MediaModel(
      pickExistingByType(media, [
        'mediaType',
        'isAdult',
        'isVideo',
        'external_id'
      ])
    )
    this.uow.registerOperation('insert', this.mediaRepository, {
      media: mediaModel,
      sourceId: this.sourceId
    })
    return mediaModel
  }

  findMediaByExternalId(externalId: string): Promise<MediaModel | undefined> {
    return this.mediaRepository.findByExternalId(externalId, this.sourceId)
  }

  updateMedia(media: MediaModel) {
    this.uow.registerOperation('update', this.mediaRepository, media)
  }

  async createPoster(
    media: MediaModel,
    image: PartialExternalImage
  ): Promise<ExternalPosterModel> {
    const externalDomain = await this.externalDomainService.findOrCreate({
      ...image.externalDomain
    })
    const externalImage = await this.externalImageService.findOrCreate({
      ...image,
      externalDomain
    })
    const externalPosterModel = this.externalPosterService.insert({
      media,
      externalImage
    })
    return externalPosterModel
  }

  deleteNotInPosters(media: MediaModel, posters: ExternalPosterModel[]) {
    this.externalPosterService.deleteNotIn(media, posters)
  }

  async createBackdrop(
    media: MediaModel,
    image: PartialExternalImage
  ): Promise<ExternalBackdropModel> {
    const externalDomain = await this.externalDomainService.findOrCreate({
      ...image.externalDomain
    })
    const externalImage = await this.externalImageService.findOrCreate({
      ...image,
      externalDomain
    })
    const externalBackdropModel = this.externalBackdropService.insert({
      media,
      externalImage
    })
    return externalBackdropModel
  }

  deleteNotInBackdrops(media: MediaModel, backdrops: ExternalBackdropModel[]) {
    this.externalBackdropService.deleteNotIn(media, backdrops)
  }

  async createLogo(
    media: MediaModel,
    image: PartialExternalImage
  ): Promise<ExternalBackdropModel> {
    const externalDomain = await this.externalDomainService.findOrCreate({
      ...image.externalDomain
    })
    const externalImage = await this.externalImageService.findOrCreate({
      ...image,
      externalDomain
    })
    const externalLogoModel = this.externalLogoService.insert({
      media,
      externalImage
    })
    return externalLogoModel
  }

  deleteNotInLogos(media: MediaModel, logos: ExternalLogoModel[]) {
    this.externalLogoService.deleteNotIn(media, logos)
  }

  createIfNotExistGenre(genre: PartialGenre) {
    return this.genreService.createIfNotExists(genre)
  }

  linkGenreByMedia(media: MediaModel, genre: GenreModel) {
    this.mediaGenreService.insert(media, genre)
  }

  deleteGenresIfNotInArray(media: MediaModel, genres: GenreModel[]) {
    this.mediaGenreService.deleteNotIn(media, genres)
  }

  setMediaBudget(
    media: MediaModel,
    budget: MediaBudget['budget'] | undefined | null
  ) {
    this.mediaBudgetService.saveBudget(media, budget ?? undefined)
  }

  setMediaRevenue(
    media: MediaModel,
    revenue: MediaRevenue['revenue'] | undefined | null
  ) {
    this.mediaRevenueService.saveRevenue(media, revenue ?? undefined)
  }

  setMediaStatus(media: MediaModel, status: string | undefined | null) {
    this.mediaStatusService.saveStatus(
      media,
      status ? this.statusService.saveStatus(status) : undefined
    )
  }

  async commit() {
    await db
      .transaction(async (tx) => {
        this.tx = tx
        await this.uow.commit()
      })
      .finally(() => {
        this.tx = db
      })
  }
}
