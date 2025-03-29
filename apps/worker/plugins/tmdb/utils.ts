import {PluginStorage} from "../../src/plugin-storage.ts";
import {StorageData} from "@plugins/tmdb/types.ts";

export async function getDataByStorage(storage: PluginStorage){
	const { data, successful } = await storage.get<StorageData>()

	if (!successful || !data)
		throw new Error(`Error get storage data`)

	return data
}