import { Company, PartialStatusType } from "@/interfaces";
import { companies, mediaProductionCompanies } from "@/db/tables";
import { eq, and, inArray, notInArray, TransactionParam } from "@/db";

export class ProductionCompanyManager {
  public static async LinkByMediaId({
    tx,
    mediaId,
    companyId
  }: TransactionParam & {
    mediaId: number
    companyId: number
  }) {
    return tx.insert(mediaProductionCompanies).values({
      mediaId,
      companyId
    }).onConflictDoUpdate({
      set: {
        mediaId,
        companyId
      },
      target: [mediaProductionCompanies.mediaId, mediaProductionCompanies.companyId]
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
      return tx.update(companies).set({
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

    return tx.insert(companies).values({
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
    return tx.delete(mediaProductionCompanies).where(
      and(
        eq(mediaProductionCompanies.mediaId, mediaId),
        eq(mediaProductionCompanies.companyId, companyId)
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
    return tx.delete(mediaProductionCompanies).where(
      and(
        eq(mediaProductionCompanies.mediaId, mediaId),
        notInArray(
          mediaProductionCompanies.companyId,
          tx.select({
            companyId: companies.id
          }).from(companies).where(inArray(companies.external_id, externalIds))
        )
      )
    ).then(() => null)
  }
}