import { PluginQueue } from './plugin-queue.ts';
import { PluginsManager } from './plugins-manager.ts'
import { SearchQueue } from './search/search-queue.ts';
import { app } from './server-app.ts'

export * from './utils'

const pluginManager = new PluginsManager()
await pluginManager.loadPlugins()

const searchQueue = new SearchQueue(3)
const pluginQueue = new PluginQueue()

/**
 * Run the server!
 */
export const run = async (port = 3001) => {
  try {
    app.listen({ port })
    return port
  } catch (err) {
    console.error(`Server didn't started. Reason: ${err}`)
    process.exit(1)
  }
}

export {
  pluginManager,
  searchQueue,
  pluginQueue
}