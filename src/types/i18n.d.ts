import 'i18next'
import type en from '~/i18n/languages/en.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation'
		resources: typeof en
	}
}
