import {DiscoverMovieResponse} from "@plugins/tmdb/client";
import {Pipeline} from "../../src/lib/pipeline.ts";
import {Context} from "@plugins/tmdb/types.ts";
import {PluginStorage} from "../../src/plugin-storage.ts";
import {createOrGetKino} from "@plugins/tmdb/steps/createOrGetKino.ts";
import {SourceMediaService} from "database/src/services/SourceMediaService.ts";

export async function saveMovies(moviesData: DiscoverMovieResponse, sourceId: number, token: string, storage: PluginStorage) {
	if (!moviesData.results)
		throw new Error("Could not save movies for movies data")

	console.info("⏳ Save movies ...")

	for (const movie of moviesData.results) {
		const pipeline = new Pipeline<Context>({
			storage,
			sourceMediaService: new SourceMediaService(sourceId),
			fetchedData: movie
		})
			.addStep(createOrGetKino)

		await pipeline.execute()
	}
}