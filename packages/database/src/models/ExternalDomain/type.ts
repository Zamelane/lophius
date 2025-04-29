import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { external_domains } from '../../schemas'

export type ExternalDomain = InferSelectModel<typeof external_domains>
export type OptionalExternalDomain = WithOptional<ExternalDomain, 'id'>
export type PartialExternalDomain = Omit<ExternalDomain, 'id'>

export type ExternalDomainId = ExternalDomain['id']
export type OptionalExternalDomainId = OptionalExternalDomain['id']
