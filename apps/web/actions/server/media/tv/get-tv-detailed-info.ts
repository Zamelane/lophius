'use server'

import { db, Media } from "database/index";
import {getCurrentLocale} from "@/i18n/current-locale";
import {translationEstimation} from "@/actions/server/media/other/estimation";

type Props = {
	id: number
}

export async function getTvDetailedInfo({ id }: Props): Promise<GetDetailedInfoResult|undefined> {
	const lang = await getCurrentLocale()
	const query_result = await db.query.medias.findFirst({
		where: (medias, {eq, and}) => and(
			eq(medias.id, id),
			eq(medias.mediaType, 'kino')
		),
		with: {
			source: {
				with: {
					pluginStorage: true
				}
			},
			translates: {
				with: {
					country: true,
					language: true
				}
			},
			externalPosters: {
				with: {
					externalImage: {
						with: {
							language: true,
							externalDomain: true
						}
					}
				}
			}
		}
	})

	if (!query_result) {
		return undefined
	}
	
	const translates = query_result.translates.sort((a, b) => {
		// В приоритете текущий язык пользователя
		let aIsPrimary = a.language.iso_639_1 === lang
		let bIsPrimary = b.language.iso_639_1 === lang

		// Оцениваем наполняемость перевода
		const aScores = translationEstimation(a)
		const bScores = translationEstimation(b)

		// Если ни один из переводов не в приоритете, то оцениваем по english-признаку
		if (!aIsPrimary && !bIsPrimary) {
			aIsPrimary = a.language.iso_639_1 === 'en'
			bIsPrimary = b.language.iso_639_1 === 'en'
		}

		// Если всё ещё приоритетный не выявлен, то оцениваем по оригинальности перевода (язык оригинала)
		if (!aIsPrimary && !bIsPrimary) {
			aIsPrimary = a.isOriginal
			bIsPrimary = b.isOriginal
		}

		// Если оба перевода по приоритету одинаковы, то предпочитаем с наибольшим количеством баллов
		if (aIsPrimary === bIsPrimary) {
			return aScores > bScores
				? 1
				: aScores < bScores
					? -1
					: 0
		}

		// Если есть наиболее предпочтительный, то его и берём
		return aIsPrimary ? 1 : -1
	})

	return {
		id: query_result.id,
		isAdult: query_result.isAdult,
		mediaType: query_result.mediaType,
		externalId: query_result.external_id,
		sources: [{
			name: "???",
			imgSrc: undefined,
			id: query_result.source.id
		}],
		posters: query_result.externalPosters.map(v => {
			const image = v.externalImage
			const language = image.language
			const domain = image.externalDomain

			return {
				imgSrc: (domain.https ? 'https' : 'http') + `://${domain.domain}${image.path.startsWith('/') ? image.path : `/${image.path}`}`,
				lang: language ? {
					id: language.id,
					nativeName: language.native_name,
					englishName: language.english_name
				} : undefined
			}
		}),
		translates: {
			runtimes: translates
				.filter(v => v.runtime > 0)
				.map(v => v.runtime),
			titles: translates
				.filter(v => v.title != null && v.title.length > 0)
				.map(v => v.title!),
			taglines: translates
				.filter(v => v.tagline != null && v.tagline.length > 0)
				.map(v => v.tagline!),
			overviews: translates
				.filter(v => v.overview != null && v.overview.length > 0)
				.map(v => v.overview!),
			homepages: translates
				.filter(v => v.homepage != null && v.homepage.length > 0)
				.map(v => v.homepage!)
		}
	}
}

type GetDetailedInfoResult = {
	id: number
	externalId: string
	mediaType: Media['mediaType']
	isAdult: boolean,
	sources: Array<{
		imgSrc?: string
		name: string
		id: number
	}>
	posters: Array<{
		lang?: {
			id: number,
			englishName?: null | string
			nativeName?: null | string
		}
		imgSrc: string
	}>
	translates: {
		titles: string[]
		taglines: string[]
		overviews: string[]
		homepages: string[]
		runtimes: number[]
	}
}