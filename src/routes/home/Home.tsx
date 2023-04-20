import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import TaskItem from './TaskItem';

export default function Home() {
	return (
		<div className="page home">
			<NavBar />
			<div className="tasks">
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
				<TaskItem />
			</div>
		</div>
	);
}
