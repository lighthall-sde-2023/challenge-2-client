import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import { Home, Login } from './routes/exports';

function BaseRoute() {
	const user = useAppSelector((s) => s.user.user);

	if (!user) {
		return <Login />;
	}

	return <Home />;
}
const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseRoute />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
