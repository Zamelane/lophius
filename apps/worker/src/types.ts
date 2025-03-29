import type {PluginStorage} from "./_DELETE_pluginsManager/pluginStorage.ts";

export type ParserPlugin = {
	name: string
	uid: string
	allowedDomains?: string[]
	version: string

	// Системные вызовы
	execute: Method
}

export type Method = (args: MethodArgs) => Promise<void>
export type MethodArgs = {
	storage: PluginStorage
}