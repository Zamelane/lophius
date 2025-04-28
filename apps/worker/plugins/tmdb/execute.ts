import {moviesLibraryLoader} from "@plugins/tmdb/actions/api.ts";
import {MethodArgs} from "../../src/types.ts";
import {checkStorage} from "@plugins/tmdb/actions/checkStorage.ts";

export async function execute({ storage }: MethodArgs) {
	await checkStorage(storage)
	await moviesLibraryLoader(storage)
}