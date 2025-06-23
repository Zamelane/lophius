import { PluginQueue } from './plugin-queue.ts'
import { PluginsManager } from './plugins-manager.ts'
import { SearchQueue } from './search/search-queue.ts'
import { app, websocketApp } from './server-app.ts'

export * from './utils'

const pluginManager = new PluginsManager()
await pluginManager.loadPlugins()

const pluginQueue = new PluginQueue()
const searchQueue = new SearchQueue(3, pluginQueue)

/**
 * Run the server!
 */
export const run = async () => {
  try {
    app.listen({ port: process.env.LOCAL_PORT })
    websocketApp.listen({ port: process.env.PUBLIC_PORT })
  } catch (err) {
    console.error(`Server didn't started. Reason: ${err}`)
    process.exit(1)
  }
}

export { pluginManager, searchQueue, pluginQueue }
