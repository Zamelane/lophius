import {DiscoverMovieResponse} from "@plugins/tmdb/client";
import {Pipeline} from "../../../src/lib/pipeline.ts";
import {Context} from "@plugins/tmdb/types.ts";
import {PluginStorage} from "../../../src/plugin-storage.ts";
import {createOrGetKino} from "@plugins/tmdb/steps/createOrGetKino.ts";
import {SourceMediaService} from "database/src/services/SourceMediaService.ts";
import {getTranslations} from "@plugins/tmdb/steps/getTranslations.ts";
import {setTranslations} from "@plugins/tmdb/steps/setTranslations.ts";
import {commitStep} from "@plugins/tmdb/steps/commit.ts";
import {getImages} from "@plugins/tmdb/steps/getImages.ts";
import {setImages} from "@plugins/tmdb/steps/setImages.ts";
import { getMovieDetails } from "../steps/getMovieDetails.ts";
import { setGenres } from "../steps/setGenres.ts";
import { setMediaBudget } from "../steps/setMediaBudget.ts";
import { setMediaStatus } from "../steps/setMediaStatus.ts";
import { setMediaRevenue } from "../steps/setMediaRevenue.ts";

export async function saveMovies(moviesData: DiscoverMovieResponse, sourceId: number, token: string, storage: PluginStorage) {
	if (!moviesData.results)
		throw new Error("Could not save movies for movies data")

	console.info("⏳ Save movies ...")

	for (const movie of moviesData.results) {
		const pipeline = new Pipeline<Context>({
			storage,
			sourceMediaService: new SourceMediaService(sourceId),
			fetchedData: movie,
			token
		})
			.addStep(createOrGetKino)
			.addStep(getTranslations)
			.addStep(getImages)
			.addStep(getMovieDetails)
			.addStep(setTranslations)
			.addStep(setImages)
			.addStep(setGenres)
			.addStep(setMediaBudget)
			.addStep(setMediaRevenue)
			.addStep(setMediaStatus)
			.addStep(commitStep)

		await pipeline.execute()
	}
}