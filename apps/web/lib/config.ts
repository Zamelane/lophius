export let isConfigured = false

loadConfiguredStatus()

function loadConfiguredStatus() {
	console.log('Configured is loaded')
	isConfigured = process.env.CONFIGURED === 'true'
}