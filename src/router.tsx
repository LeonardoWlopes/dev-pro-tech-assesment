import { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import { useAuthStore } from './stores/auth'
import { useShallow } from 'zustand/shallow'
import { LoadingScreen } from './screens/loading'

const HomeScreen = lazy(() => import('./screens/home'))

export function Router() {
	const isLoggedIn = useAuthStore(useShallow((state) => !!state.accessToken))

	const authRoutes = createBrowserRouter([
		{
			path: '/',
			element: <HomeScreen />,
		},
		{
			path: '*',
			element: <Navigate to="/" />,
		},
	])

	const appRoutes = createBrowserRouter([
		{
			path: '/',
			element: <HomeScreen />,
		},
		{
			path: '*',
			element: <Navigate to="/" />,
		},
	])

	return (
		<Suspense fallback={<LoadingScreen />}>
			<RouterProvider router={isLoggedIn ? appRoutes : authRoutes} />
		</Suspense>
	)
}
