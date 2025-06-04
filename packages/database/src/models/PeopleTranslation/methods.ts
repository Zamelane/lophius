import { peopleTranslations, PeopleTranslationsTableType } from 'database/schemas'
import { queryOneResult } from 'database/utils'
import { PeopleTranslationModel } from './model'
import { PeopleTranslationRepository } from './repository'
import { People } from '../People';
import { Country } from '../Country';
import { Language } from '../Language';
import { and, eq } from 'drizzle-orm';

/**
 * Операция Insert для модели UoW
 */
export async function insertPeopleTranslate(this: PeopleTranslationRepository, data: PeopleTranslationModel) {
  data.validateRequiredModels()
  const alreadyExist = await this.find({
    peopleId: data.peopleId,
    countryId: data.countryId,
    languageId: data.languageId
  })

  if (alreadyExist) {
    return await this.update(data)
  }

  return queryOneResult(
    await this.tx
      .insert(peopleTranslations)
      .values(data)
      .onConflictDoUpdate({
        target: [peopleTranslations.peopleId, peopleTranslations.languageId, peopleTranslations.countryId],
        set: data
      })
      .returning(),
    (v) => v
  )
}

/**
 * Возвращает перевод по его составным id
 */
export async function findPeopleTranslateById(
  this: PeopleTranslationRepository,
  data: {
    peopleId: People['id']
    countryId?: Country['id'] | null
    languageId?: Language['id'] | null
  }
): Promise<PeopleTranslationsTableType | undefined> {
  return queryOneResult(
    await this.tx.select().from(peopleTranslations).where(
      and(
        eq(peopleTranslations.peopleId, data.peopleId),
        data.countryId ? eq(peopleTranslations.countryId, data.countryId) : undefined,
        data.languageId ? eq(peopleTranslations.languageId, data.languageId) : undefined
      )
    )
  )
}

/**
 * Обновляет перевод по его составным id
 */
export async function updatePeopleTranslateById(
  this: PeopleTranslationRepository,
  data: PeopleTranslationModel
): Promise<PeopleTranslationsTableType | undefined> {
  data.validateRequiredModels()
  return queryOneResult(
    await this.tx.update(peopleTranslations).set(data).where(
      and(
        eq(peopleTranslations.peopleId, data.peopleId),
        data.countryId ? eq(peopleTranslations.countryId, data.countryId) : undefined,
        data.languageId ? eq(peopleTranslations.languageId, data.languageId) : undefined
      )
    ).returning()
  )
}