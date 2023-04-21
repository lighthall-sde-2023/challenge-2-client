import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSortIndex, setTaskBeingEdited } from '../../redux/tasksStateSlice';
import { logoutUser } from '../../redux/userStateSlice';

export default function NavBar() {
	const dispatch = useAppDispatch();

	const sortIndex = useAppSelector((s) => s.tasks.sortIndex);

	return (
		<div className="nav-bar">
			<button onClick={() => dispatch(setTaskBeingEdited(''))}>
				<h2>Create Task</h2>
			</button>
			<button onClick={() => dispatch(setSortIndex((sortIndex + 1) % 3))}>
				<h2>Change Sort</h2>
			</button>
			<button onClick={() => dispatch(logoutUser(''))}>
				<h2>Logout</h2>
			</button>
		</div>
	);
}
