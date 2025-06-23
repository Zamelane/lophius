import type { WithRequired } from '../../index'
import type { OptionalExternalBackdrop } from './type'

export class ExternalBackdropModel implements OptionalExternalBackdrop {
  externalImageId?: OptionalExternalBackdrop['externalImageId']
  mediaId?: OptionalExternalBackdrop['mediaId']
  media!: OptionalExternalBackdrop['media']
  externalImage!: OptionalExternalBackdrop['externalImage']

  constructor(data: OptionalExternalBackdrop) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalExternalBackdrop,
    'externalImageId' | 'mediaId'
  > {
    // Валидация ключей у внешних моделей
    this.media.validateRequiredIds()
    this.externalImage.validateRequiredIds()
    // Копируем ключи внешних моделей
    this.mediaId = this.media.id
    this.externalImageId = this.externalImage.id
  }
}
