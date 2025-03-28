import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {countries} from "../../schemas";

export type Country = InferSelectModel<typeof countries>
export type OptionalCountry = WithOptional<Country, 'id'>
export type PartialCountry = Omit<Country, 'id'>
export type OptionalNamesCountry = WithOptional<PartialCountry, 'english_name'>

export type CountryId = OptionalCountry['id']
export type OptionalCountryId = Country['id']