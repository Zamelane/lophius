'use server'

import {db} from "database/index";
import {getCurrentLocale} from "@/i18n/current-locale";
import {translationEstimation} from "@/actions/server/media/other/estimation";
import {prioritizationByLanguage} from "@/actions/server/media/other/prioritization-by-language";
import {
	MediasTableType,
	SourcesTableType,
	CountriesTableType,
	LanguagesTableType,
	TranslatesTableType,
	PluginStorageTableType,
	ExternalImagesTableType,
	ExternalDomainsTableType,
	ExternalPostersTableType
} from "database/schemas"

type MediaWithRelations = MediasTableType & {
	source: SourcesTableType & {
		pluginStorage: null | PluginStorageTableType;
	};
	translates: (TranslatesTableType & {
		country: CountriesTableType | null;
		language: LanguagesTableType;
	})[];
	externalPosters: (ExternalPostersTableType & {
		externalImage: ExternalImagesTableType & {
			language: LanguagesTableType | null;
			externalDomain: ExternalDomainsTableType;
		};
	})[];
};

type Props = {
	id: number
	alreadyLoadedData?: undefined
} | {
	id?: undefined
	alreadyLoadedData: MediaWithRelations
}

export async function getTvDetailedInfo({ id, alreadyLoadedData }: Props): Promise<GetTvDetailedInfoResult|undefined> {
	const lang = await getCurrentLocale()
	const query_result = id ? await db.query.medias.findFirst({
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
	}) : alreadyLoadedData

	if (!query_result) {
		return undefined
	}

	//console.log(query_result.external_id)
	
	const translates = query_result.translates.sort(
		(a, b) =>
			prioritizationByLanguage(
				{ data: a, lang: a.language.iso_639_1 },
				{ data: b, lang: b.language.iso_639_1 },
				lang,
				translationEstimation,
				(a, b) => [a.isOriginal, b.isOriginal]
			)
	)

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
		},
		posters: query_result.externalPosters
			.sort((a, b) =>
				prioritizationByLanguage(
					{ data: a, lang: a.externalImage?.language?.iso_639_1 ?? "" },
					{ data: b, lang: b.externalImage?.language?.iso_639_1 ?? "" },
					lang,
					() => 0,
					(a, b) => {
						const a_avg = Number.parseFloat(a.externalImage.vote_avg ?? "0")
						const b_avg = Number.parseFloat(b.externalImage.vote_avg ?? "0")
						return a_avg > b_avg
							? [true, false]
							: a_avg === b_avg
								? [true, true]
								: [false, true]
					}
				)
			)
			.map(v => {
			const image = v.externalImage
			const language = image.language
			const domain = image.externalDomain

			return {
				width: image.width,
				height: image.height,
				imgSrc: (domain.https ? 'https' : 'http') + `://${domain.domain}${image.path.startsWith('/') ? image.path : `/${image.path}`}`,
				lang: language ? {
					id: language.id,
					nativeName: language.native_name,
					englishName: language.english_name
				} : undefined
			}
		})
	}
}

export type GetTvDetailedInfoResult = {
	id: number
	externalId: string
	mediaType: MediasTableType['mediaType']
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
		width?: null | number
		height?: null | number
	}>
	translates: {
		titles: string[]
		taglines: string[]
		overviews: string[]
		homepages: string[]
		runtimes: number[]
	}
}