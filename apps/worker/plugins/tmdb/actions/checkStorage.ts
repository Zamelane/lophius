import * as process from 'node:process'
import type { StorageData } from '@plugins/tmdb/types.ts'
import type { PluginStorage } from '../../../src/plugin-storage.ts'

export async function checkStorage(storage: PluginStorage): Promise<StorageData> {
  const { data } = await storage.get<StorageData>()

  if (!data) {
    const storageData = {
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
    }

    const result = await storage.create<StorageData>(storageData)

    if (!result.successful) throw new Error('Error set storage data')
    return storageData
  }

  return data
}
