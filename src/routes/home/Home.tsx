import React, { useCallback, useEffect } from 'react';
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

	const sortIndex = useAppSelector((s) => s.tasks.sortIndex);

	const sortTasks = useCallback(
		(a: string, b: string) => {
			const taskA = tasks[a]!;
			const taskB = tasks[b]!;

			switch (sortIndex) {
				case 0:
					if (
						taskA.title.replaceAll(' ', '').toLowerCase() >
						taskB.title.replaceAll(' ', '').toLowerCase()
					) {
						return 1;
					}

					if (
						taskA.title.replaceAll(' ', '').toLowerCase() <
						taskB.title.replaceAll(' ', '').toLowerCase()
					) {
						return -1;
					}

					return 0;
				case 1:
					return taskA.status - taskB.status;

				case 2:
					return taskA.due_date - taskB.due_date;
				default:
					return 0;
			}
		},
		[sortIndex, tasks]
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
				{Object.keys(tasks)
					.sort(sortTasks)
					.map((a) => (
						<TaskItem task={tasks[a]!} key={a} />
					))}
			</div>
		</div>
	);
}
