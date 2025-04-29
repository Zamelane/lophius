import type { ExternalDomainModel } from 'database/models/ExternalDomain/model.ts'
import type { LanguageModel } from 'database/models/Language/model.ts'
import type { WithOptional } from '../../index'
import type { external_images } from '../../schemas'

export type ExternalImage = typeof external_images.$inferSelect & {
  language: LanguageModel | null
  externalDomain: ExternalDomainModel
}
export type OptionalExternalImage = WithOptional<
  ExternalImage,
  | 'id'
  | 'languageId'
  | 'sourceId'
  | 'externalDomainId'
  | 'externalDomain'
  | 'language'
>
export type PartialExternalImage = Omit<
  ExternalImage,
  'id' | 'languageId' | 'sourceId' | 'externalDomainId'
>

export type ExternalImageId = ExternalImage['id']
export type OptionalExternalImageId = OptionalExternalImage['id']
