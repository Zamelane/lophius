import {WithOptional} from "@/database";
import {InferSelectModel} from "drizzle-orm";
import {countries} from "@/database/schemas";

export type Country = InferSelectModel<typeof countries>
export type OptionalCountry = WithOptional<Country, 'id'>
export type PartialCountry = Omit<Country, 'id'>