import { defineConfig } from 'cypress'
import { allureCypress } from 'allure-cypress/reporter'
import envs from './cypress/fixtures/env.json'

export default defineConfig({
	env: {
		API_BASE_URL: envs.dev.baseAPIUrl,
	},
	e2e: {
		baseUrl: envs.local.baseUrl,
		defaultCommandTimeout: 4000,
		requestTimeout: 5000,
		viewportWidth: 1920,
		viewportHeight: 1080,
		screenshotOnRunFailure: true,
		video: true,
		videosFolder: 'cypress/videos',
		screenshotsFolder: 'cypress/screenshots',
		setupNodeEvents(on, config) {
			allureCypress(on, config, {
				resultsDir: 'allure-results',
			})
			return config
		},
	},
})
