import { createBrowserRouter, RouterProvider } from 'react-router';
import { WeatherScreen } from '~/screens/weather';

const router = createBrowserRouter([
	{
		path: '/',
		element: <WeatherScreen />,
	},
	{
		path: '*',
		element: <WeatherScreen />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
