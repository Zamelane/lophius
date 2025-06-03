import { db, eq, sql } from 'database'
import {
  external_domains,
  external_images,
  external_posters,
  languages,
  medias,
  translates
} from 'database/schemas'
import { languagePriority } from '../../media/search/search/searchMediaOffline'

// Запрос выбора лучшего перевода для каждой строки медиа, которое будет отдавать
export function literalTranslate(locale: string) {
  return db
    .select({
      title: translates.title,
      language: languages.iso_639_1
    })
    .from(translates)
    .leftJoin(languages, eq(languages.id, translates.languageId))
    .where(eq(translates.mediaId, medias.id)) // Выбираем тот, у которого язык ближе к пользователю
    .orderBy(...languagePriority(languages.iso_639_1, locale))
    .limit(1)
    .as('literal_translate')
}

// Запрос выбора лучшего постера для каждой строки медиа, которое будем отдавать
export function literalPosters(locale: string) {
  return db
    .select({
      https: external_domains.https,
      domain: external_domains.domain,
      path: external_images.path,
      width: external_images.width,
      height: external_images.height
    })
    .from(external_posters)
    .innerJoin(
      external_images,
      eq(external_images.id, external_posters.externalImageId)
    )
    .innerJoin(
      external_domains,
      eq(external_domains.id, external_images.externalDomainId)
    )
    .leftJoin(languages, eq(languages.id, external_images.languageId))
    .where(eq(external_posters.mediaId, medias.id)) // Выбираем тот, у которого язык ближе к пользователю
    .orderBy(
      ...languagePriority(languages.iso_639_1, locale),
      sql`${external_images.vote_avg} DESC`,
      sql`${external_images.vote_count} DESC`
    )
    .limit(1)
    .as('literal_posters')
}
