import type { companies } from 'database/schemas'
import type { WithOptional } from 'database/utils.ts'
import type { InferSelectModel } from 'drizzle-orm'

export type Company = InferSelectModel<typeof companies>
export type OptionalCompany = WithOptional<Company, 'id' | 'sourceId'>
export type PartialCompany = Omit<Company, 'id' | 'sourceId'>

export type CompanyId = Company['id']
export type OptionalCompanyId = OptionalCompany['id']
