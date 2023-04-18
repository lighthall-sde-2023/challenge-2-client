import React from 'react';
import './App.css';
import Home from './routes/Home';
import Login from './routes/Login';
import Task from './routes/Task';
import AddTask from './routes/AddTask';
import Edit from './routes/Edit';
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
	{
		path: '/task',
		element: <Task />,
	},
	{
		path: '/addtask',
		element: <AddTask />,
	},
	{
		path: '/edit',
		element: <Edit />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
