export let isConfigured = false
export const env: {
	[key: string]: string | undefined
} = {}

function loadConfiguredStatus() {
	console.log('Configured is loaded')
	console.log(env.CONFIGURED)
	isConfigured = env.CONFIGURED === 'true'
}

export function loadConfig(configToSet?: { [key: string]: string }) {
	console.log(configToSet)
	if (configToSet) {
		Object.keys(configToSet).map(v => {
			env[v] = configToSet[v]
		})
	} else {
		Object.keys(process.env).map(v => {
			env[v] = process.env[v]
		})
	}

	loadConfiguredStatus()
}

// DEVELOPMENT
let loaded = false
if (!loaded) {
	loadConfig()
	loaded = true
}