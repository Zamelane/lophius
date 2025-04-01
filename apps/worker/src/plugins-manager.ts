import {glob} from "glob";
import {ParserPlugin} from "./types.ts";

export class PluginsManager {
	private pluginsPath: string = "./plugins/*/index.{ts,js}";
	private plugins: Record<string, ParserPlugin> = {}

	constructor() {
		console.info("⚙️ Initializing Manager ...");
	}

	async loadPlugins() {
		console.info("📂 Reading plugins from the /plugins/ folder...");
		const pluginEntries = await glob(this.pluginsPath);
		this.plugins = {}

		if (pluginEntries.length)
			console.info("📋 Checking plugin structure...")
		let i = 0
		for (const entry of pluginEntries) {
			i++
			try {
				if (entry.includes("_")) {
					console.info(`⚠️ Ignoring  '${entry}': the symbol '_' is not allowed (see naming rules)`)
					continue
				}
				// Динамический импорт (Bun поддерживает ES-модули)
				const pluginModule = await import(entry);
				const plugin = pluginModule.default as ParserPlugin;

				if (!plugin.name) {
					console.error(`🛑 Plugin '${entry}' ignored: missing 'name' field!`);
					continue;
				}

				this.plugins[plugin.name] = plugin;
				console.info(`✅ Plugin loaded: ${plugin.name}`);
			} catch (err) {
				console.error(`❌ Plugin loading error (${entry}):`, err);
			}
		}

		console.info("ℹ️ Plugins loading completed")
	}
}