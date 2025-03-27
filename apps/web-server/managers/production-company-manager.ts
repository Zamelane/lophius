import { Company, PartialStatusType } from "@/interfaces";
import { eq, and, inArray, notInArray, TransactionParam } from "database";
import { companies, media_production_companies } from "@/database/schemas";

export class ProductionCompanyManager {
  public static async LinkByMediaId({
    tx,
    mediaId,
    companyId
  }: TransactionParam & {
    mediaId: number
    companyId: number
  }) {
    return tx.insert(media_production_companies).values({
      mediaId,
      companyId
    }).onConflictDoUpdate({
      set: {
        mediaId,
        companyId
      },
      target: [media_production_companies.mediaId, media_production_companies.companyId]
    }).returning().then(v => v[0])
  }

  public static async Save({
    tx,
    company,
    sourceId,
    isPartial
  }: TransactionParam & PartialStatusType & {
    company: Company
    sourceId: number
  }) {
    const existCompany = await tx.select().from(companies).where(
      and(
        eq(companies.external_id, company.external_id),
        eq(companies.sourceId, sourceId)
      )
    ).limit(1).then(v => v.length ? v[0] : undefined)

    if (existCompany) {
      return await tx.update(companies).set({
        ...company,
        name: isPartial && !company.name ? existCompany.name : company.name,
        homepage: isPartial && !company.homepage ? existCompany.homepage : company.homepage,
        description: isPartial && !company.description ? existCompany.description : company.description,
        originCountryId: isPartial && !company.originCountryId ? existCompany.originCountryId : company.originCountryId,
        parentCompanyId: isPartial && !company.parentCompanyId ? existCompany.parentCompanyId : company.parentCompanyId,
        logoExternalFileId: isPartial && !company.logoExternalFileId ? existCompany.logoExternalFileId : company.logoExternalFileId
      }).where(
        and(
          eq(companies.sourceId, sourceId),
          eq(companies.external_id, company.external_id)
        )
      ).returning().then(v => v[0])
    }

    return await tx.insert(companies).values({
      ...company,
      sourceId
    }).onConflictDoUpdate({
      set: {
        ...company
      },
      target: [companies.external_id, companies.sourceId]
    }).returning().then(v => v[0])
  }

  public static async UnlinkByMediaId({
    tx,
    mediaId,
    companyId
  }: TransactionParam & {
    mediaId: number
    companyId: number
  }) {
    return tx.delete(media_production_companies).where(
      and(
        eq(media_production_companies.mediaId, mediaId),
        eq(media_production_companies.companyId, companyId)
      )
    ).then(() => null)
  }

  public static async UnlinkByMediaIdIfExternalIdNotInArray({
    tx,
    mediaId,
    externalIds
  }: TransactionParam & {
    externalIds: string[]
    mediaId: number
  }) {
    return tx.delete(media_production_companies).where(
      and(
        eq(media_production_companies.mediaId, mediaId),
        notInArray(
          media_production_companies.companyId,
          tx.select({
            companyId: companies.id
          }).from(companies).where(inArray(companies.external_id, externalIds))
        )
      )
    ).then(() => null)
  }
}