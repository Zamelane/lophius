import { PluginStorage } from "src/pluginsManager/pluginStorage"

export type StorageData = {
  movies: ParsedConfig
  serials: ParsedConfig
  token: string | null
  defaultLang: string
}

type ParsedConfig = {
  isFullParsed: boolean
  firstUpdateDate: Date | null
  startLastUpdateDate: Date | null
  succesfullLastUpdateDate: Date | null
  page: number
  date_gte: string | null
  date: string | null
}

export type PluginArgs = {
  storage: PluginStorage
  data: StorageData
}