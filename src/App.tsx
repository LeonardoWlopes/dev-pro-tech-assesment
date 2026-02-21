import { useTranslation } from 'react-i18next'

export function App() {
	const { t } = useTranslation("app")
	
	return (
		<main className="flex min-h-screen items-center justify-center">
			<h1 className="text-2xl font-semibold">{t("title")}</h1>
		</main>
	)
}
