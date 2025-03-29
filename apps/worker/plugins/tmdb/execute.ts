import {moviesLibraryLoader} from "@plugins/tmdb/api.ts";
import {MethodArgs} from "../../src/types.ts";

export async function execute({ storage }: MethodArgs) {
	await moviesLibraryLoader(storage)
}