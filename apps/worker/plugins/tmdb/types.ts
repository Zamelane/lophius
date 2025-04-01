import {DiscoverMovieResponse, type MovieTranslationsData, type MovieTranslationsResponse} from "./client";
import {PluginStorage} from "../../src/plugin-storage.ts";
import {ArrayElementType} from "@/interfaces";
import {MediaModel} from "database/src/models/Media/model.ts";
import {SourceMediaService} from "database/src/services/SourceMediaService.ts";

export interface Context {
	fetchedData: ArrayElementType<DiscoverMovieResponse['results']>
	fetchedTranslatesData?: MovieTranslationsResponse
	storage: PluginStorage
	sourceMediaService: SourceMediaService
	mediaModel?: MediaModel
	token: string
}

export type StorageData = {
	movies: ParsedConfig
	serials: ParsedConfig
	token: string | null
	defaultLang: string
}

export type ParsedConfig = {
	isFullParsed: boolean
	firstUpdateDate: Date | null
	startLastUpdateDate: Date | null
	succesfullLastUpdateDate: Date | null
	page: number
	date_gte: string | null
	date: string | null
}