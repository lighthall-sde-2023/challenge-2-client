import React from 'react';
import './App.css';
import Home from './routes/Home';
import Login from './routes/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <Home />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
