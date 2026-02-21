import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers/query-provider';
import { WeatherScreen } from '~/screens/weather';
import '~/i18n/config';

const root = document.getElementById('root');
if (root) {
	createRoot(root).render(
		<StrictMode>
			<QueryProvider>
				<WeatherScreen />
			</QueryProvider>
		</StrictMode>,
	);
}
