import { pluginManager, run } from './src'
export * from './src'

run().then((p) => {
  const message = `🌐 HTTP server started: http://127.0.0.1:${p}`
  console.log('='.repeat(message.length))
  console.info(message)
  console.log('='.repeat(message.length))
  //pluginManager.startMaintenance()
})
