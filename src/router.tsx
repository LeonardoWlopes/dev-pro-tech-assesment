import { RouterProvider, createBrowserRouter } from 'react-router'
import { App } from './App'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '*',
		element: <App />,
	},
])

export function Router() {
	return <RouterProvider router={router} />
}
