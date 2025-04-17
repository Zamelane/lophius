import {PluginStorage} from "../../../src/plugin-storage.ts";
import {StorageData} from "@plugins/tmdb/types.ts";
import * as process from "node:process";

export async function checkStorage(storage: PluginStorage): Promise<void> {
    const { data } = await storage.get<StorageData>()

    if (!data) {
        const result = await storage.create<StorageData>({
            defaultLang: 'en',
            movies: {
                date: null,
                date_gte: null,
                firstUpdateDate: null,
                page: 1,
                isFullParsed: false,
                startLastUpdateDate: null,
                succesfullLastUpdateDate: null
            },
            serials: {
                date: null,
                date_gte: null,
                firstUpdateDate: null,
                page: 1,
                isFullParsed: false,
                startLastUpdateDate: null,
                succesfullLastUpdateDate: null
            },
            token: process.env.TMDB_TOKEN!
        })

        if (!result.successful)
            throw new Error('Error set storage data')
    }
}