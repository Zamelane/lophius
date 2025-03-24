import {fastify} from "fastify";
import {logger} from "./utils";
import {pluginManager} from "./pluginsManager";

export * from './pluginsManager'
export * from './utils'

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
export const run = async (port: number = 3001) => {
  try {
    await pluginManager.reloadPlugins()
    await app.listen({ port })
    return port
  } catch (err) {
    logger.fatal("Server didn't started. Reason: " + err)
    process.exit(1)
  }
}