import type { WithRequired } from '../../index'
import type { OptionalExternalLogo } from './type'

export class ExternalLogoModel implements OptionalExternalLogo {
  externalImageId?: OptionalExternalLogo['externalImageId']
  mediaId?: OptionalExternalLogo['mediaId']
  media!: OptionalExternalLogo['media']
  externalImage!: OptionalExternalLogo['externalImage']

  constructor(data: OptionalExternalLogo) {
    this.setData(data)
  }

  setData(data: OptionalExternalLogo) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalExternalLogo,
    'externalImageId' | 'mediaId'
  > {
    // Валидация внешних моделей
    this.media.validateRequiredIds()
    this.externalImage.validateRequiredIds()
    // Перенос свойств (id'шников)
    this.mediaId = this.media.id
    this.externalImageId = this.externalImage.id
  }
}
