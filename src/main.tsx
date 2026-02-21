import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers/query-provider';
import { Router } from './router';
import '~/i18n/config';

const root = document.getElementById('root');
if (root) {
	createRoot(root).render(
		<StrictMode>
			<QueryProvider>
				<Router />
			</QueryProvider>
		</StrictMode>,
	);
}
