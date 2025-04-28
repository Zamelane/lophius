import {WithOptional} from "database/utils.ts";
import {InferSelectModel} from "drizzle-orm";
import {companies} from "database/schemas";

export type Company = InferSelectModel<typeof companies>
export type OptionalCompany = WithOptional<Company, 'id' | 'sourceId'>
export type PartialCompany = Omit<Company, 'id' | 'sourceId'>

export type CompanyId = Company['id']
export type OptionalCompanyId = OptionalCompany['id']