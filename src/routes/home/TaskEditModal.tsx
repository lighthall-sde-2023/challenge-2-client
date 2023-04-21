import Dropdown from 'react-dropdown';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { ITask } from '../../types';
import {
	createTask,
	setTaskBeingEdited,
	updateTask,
} from '../../redux/tasksStateSlice';
import { timestampToString, stringToTimestamp } from '../../utils';

const DROPDOWN_OPTIONS = [
	{ value: '0', label: 'Not Started' },
	{ value: '1', label: 'In Progress' },
	{ value: '2', label: 'Completed' },
];

export default function TaskEditModal() {
	const selectedTask = useAppSelector((s) =>
		s.tasks.taskBeingEdited ? s.tasks.tasks[s.tasks.taskBeingEdited] : undefined
	);

	const [taskInfo, setTaskInfo] = useState<
		Pick<ITask, 'due_date' | 'description' | 'status' | 'title'>
	>(
		selectedTask
			? { ...selectedTask }
			: {
					title: '',
					status: 0,
					description: '',
					due_date: Date.now() / 1000,
			  }
	);

	const dispatch = useAppDispatch();

	const onCompleteButtonClicked = useCallback(() => {
		const isCreating = selectedTask === undefined;

		if (!taskInfo.title.length) {
			toast.error('Please name your task');
			return;
		}

		if (!taskInfo.description.length) {
			toast.error('Please describe your task');
			return;
		}

		if (isCreating) {
			dispatch(createTask(taskInfo));
		} else {
			dispatch(updateTask({ ...taskInfo, id: selectedTask.id }));
		}

		dispatch(setTaskBeingEdited(undefined));
	}, [dispatch, selectedTask, taskInfo]);

	return (
		<div
			className="task-edit-modal"
			onClick={(e) => {
				if ((e.target as HTMLDivElement).className === 'task-edit-modal') {
					dispatch(setTaskBeingEdited(undefined));
				}
			}}
		>
			<div className="task-edit-modal-content">
				<span className="modal-field">
					<h2>Title</h2>
					<input
						required={true}
						type={'text'}
						placeholder={'Name your task'}
						value={taskInfo.title}
						onChange={(e) => {
							setTaskInfo((t) => {
								t.title = e.target.value;
								return { ...t };
							});
						}}
					/>
				</span>
				<span className="modal-field">
					<h2>Description</h2>
					<textarea
						style={{
							resize: 'none',
							outline: 'none',
							borderRadius: '5px',
							height: '100px',
							boxSizing: 'border-box',
							padding: '10px',
						}}
						required={true}
						placeholder={'Describe your task'}
						value={taskInfo.description}
						onChange={(e) => {
							setTaskInfo((t) => {
								t.description = e.target.value;
								return { ...t };
							});
						}}
					/>
				</span>
				<span className="modal-field">
					<h2>Status</h2>
					<Dropdown
						options={DROPDOWN_OPTIONS}
						onChange={(o) => {
							setTaskInfo((t) => {
								t.status = (parseInt(o.value) || 0) as typeof t['status'];
								return { ...t };
							});
						}}
						value={`${taskInfo.status}`}
						placeholder="Select an option"
					/>
				</span>
				<span className="modal-field">
					<h2>Due Date</h2>
					<input
						style={{}}
						type="datetime-local"
						defaultValue={timestampToString(taskInfo.due_date)}
						onChange={(e) =>
							setTaskInfo((t) => {
								t.due_date = stringToTimestamp(e.target.value);
								return { ...t };
							})
						}
					/>
				</span>

				<button
					onClick={onCompleteButtonClicked}
					disabled={
						taskInfo.title.length === 0 || taskInfo.description.length === 0
					}
				>
					<h3>{selectedTask ? 'Done' : 'Create'}</h3>
				</button>
			</div>
		</div>
	);
}
