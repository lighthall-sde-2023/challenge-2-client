import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import Countdown from './Countdown';
import { ITask } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { deleteTask, setTaskBeingEdited } from '../../redux/tasksStateSlice';
export interface ITaskItemProps {
	task: ITask;
}

const TASK_STATUS_MAP = {
	0: 'Not Started',
	1: 'In Progress',
	2: 'Completed',
};

export default function TaskItem({ task }: ITaskItemProps) {
	const dispatch = useAppDispatch();

	return (
		<div className="task-item">
			<div className="task-item-content">
				<span className="task-title">
					<h3>{task.title}</h3>
				</span>
				<span className="task-info">
					<FiEdit
						onClick={() => {
							dispatch(setTaskBeingEdited(task.id));
						}}
					/>
					<MdDeleteOutline
						onClick={() => {
							dispatch(deleteTask(task.id));
						}}
					/>
					<span className="task-status">
						<h3>{TASK_STATUS_MAP[task.status]}</h3>
						<Countdown date={task.due_date} />
					</span>
				</span>
			</div>
			<div className="task-item-description">
				<h3
					style={{
						textOverflow: 'ellipsis',
						fontWeight: '400',
						width: '100%',
						overflow: 'hidden',
					}}
				>
					{task.description}
				</h3>
			</div>
		</div>
	);
}
