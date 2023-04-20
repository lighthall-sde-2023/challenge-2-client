import './Home.css';
import React, { useEffect } from 'react';
import NavBar from './NavBar';
import TaskItem from './TaskItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import TaskEditModal from './TaskEditModal';
import { loadTasks } from '../../redux/tasksStateSlice';

export default function Home() {
	const tasks = useAppSelector((t) => t.tasks.tasks);
	const isEditingTask = useAppSelector(
		(s) => s.tasks.taskBeingEdited !== undefined
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadTasks(''));
	}, [dispatch]);

	return (
		<div className="page home">
			<NavBar />
			{isEditingTask && <TaskEditModal />}
			<div className="tasks">
				{Object.keys(tasks).map((a) => (
					<TaskItem task={tasks[a]!} key={a} />
				))}
			</div>
		</div>
	);
}
