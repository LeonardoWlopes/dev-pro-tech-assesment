import { useTranslation } from 'react-i18next';

export function App() {
	const { t } = useTranslation('app');

	return (
		<main className="flex min-h-screen items-center justify-center">
			<h1 className="font-semibold text-2xl">{t('title')}</h1>
		</main>
	);
}
