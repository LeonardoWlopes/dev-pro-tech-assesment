import 'allure-cypress'

Cypress.on('uncaught:exception', (error, runnable) => {
	return false
})
