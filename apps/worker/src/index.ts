import { fastify } from 'fastify'
import { PluginsManager } from './plugins-manager.ts'

export * from './utils'

export const pluginManager = new PluginsManager()

const app = fastify({
  /* config */
})

app.get('/', (req, res) => {
  res.status(200).send({
    ok: true
  })
})

/**
 * Run the server!
 */
export const run = async (port = 3001) => {
  try {
    await pluginManager.loadPlugins()
    await app.listen({ port })
    return port
  } catch (err) {
    console.error(`Server didn't started. Reason: ${err}`)
    process.exit(1)
  }
}
