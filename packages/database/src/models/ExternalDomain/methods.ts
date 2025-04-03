import { queryOneResult } from "database/utils";
import { ExternalDomainRepository } from "database/models";
import { external_domains } from "database/schemas";
import { ExternalDomainModel } from "./model";
import { ExternalDomain } from "./type";
import { and, eq } from "drizzle-orm";

export async function findExternalDomainWithCredentionals(
  this: ExternalDomainRepository,
  credentionals: Omit<ExternalDomain, 'id'>
) {
  const result = queryOneResult(
    await this.tx.select()
      .from(external_domains)
      .where(
        and(
          eq(external_domains.domain, credentionals.domain),
          eq(external_domains.https, credentionals.https)
        )
      ).limit(1)
  )

  if (result)
    return new ExternalDomainModel(result)

  return undefined
}

export async function insertExternalDomain(
  this: ExternalDomainRepository,
  model: ExternalDomainModel
) {
  return queryOneResult(
    await this.tx.insert(external_domains)
      .values({
        ...model
      })
      .returning(),
      v => model.id = v.id
  )
}