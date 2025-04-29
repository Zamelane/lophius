import { glob } from 'glob'

interface ParserPlugin {
  name: string
  init(): Promise<void>
  // ... другие методы
}

export async function loadPlugins(
  path: string
): Promise<Record<string, ParserPlugin>> {
  const pluginEntries = await glob(path)
  const plugins: Record<string, ParserPlugin> = {}

  for (const entry of pluginEntries) {
    try {
      // Динамический импорт (Bun поддерживает ES-модули)
      const pluginModule = await import(entry)
      const plugin = pluginModule.default as ParserPlugin

      if (!plugin.name) {
        console.error(`Плагин в ${entry} не имеет поля 'name'!`)
        continue
      }

      plugins[plugin.name] = plugin
      console.log(`✅ Загружен плагин: ${plugin.name}`)
    } catch (err) {
      console.error(`❌ Ошибка загрузки плагина (${entry}):`, err)
    }
  }

  return plugins
}
