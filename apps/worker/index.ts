import { pluginManager, run } from './src'
export * from './src'

run().then(() => {
  const message =
    `🌍 HTTP server started: http://127.0.0.1:${process.env.LOCAL_PORT}` +
    `\n📡 WebSocket server started: ws://127.0.0.1:${process.env.PUBLIC_PORT}`
  console.log('='.repeat(message.length))
  console.info(message)
  console.log('='.repeat(message.length))
  //pluginManager.startMaintenance()
})
