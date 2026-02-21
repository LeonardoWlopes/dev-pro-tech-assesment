import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import { QueryProvider } from './providers/query-provider'
import '~/i18n/config'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<Router />
		</QueryProvider>
	</StrictMode>,
)
