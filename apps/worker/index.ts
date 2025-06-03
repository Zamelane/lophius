import { run } from './src'
export * from './src'

run().then((p) => {
  const message =
    `🌍 HTTP server started: http://127.0.0.1:${p}` +
    `\n📡 WebSocket server started: ws://127.0.0.1:${p + 1}`
  console.log('='.repeat(message.length))
  console.info(message)
  console.log('='.repeat(message.length))
  //pluginManager.startMaintenance()
})
