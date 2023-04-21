import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	IReduxState,
	ITask,
	ITaskSliceState,
	TasksServerResponse,
} from '../types';
import { toast } from 'react-hot-toast';
import { TasksApi } from '../api';

export type ITaskUpdate = Pick<ITask, 'id'> & Partial<ITask>;

export type INewTask = Pick<
	ITask,
	'description' | 'due_date' | 'title' | 'status'
>;

const initialState: ITaskSliceState = {
	tasks: {},
	sortIndex: 0,
	taskBeingEdited: undefined,
};

const SORT_TYPES: string[] = ['Title', 'Status', 'Date'];

const loadTasks = createAsyncThunk<ITask[], string, IReduxState>(
	'tasks/load',
	async (query, thunk) => {
		const toastId = toast.loading('Loading Tasks');
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) throw new Error('User not logged in');
			const userId = userState.user.id;
			const response = await TasksApi.get<TasksServerResponse<ITask[]>>(
				`tasks/${userId}`
			);

			console.log('Response', response.data);

			if (response.data.error) {
				throw new Error(response.data.data);
			}
			toast.success('Tasks Loaded', {
				id: toastId,
			});
			return response.data.data;
		} catch (error: any) {
			console.error(error);
			toast.error(error.message, {
				id: toastId,
			});
			return [];
		}
	}
);

const createTask = createAsyncThunk<ITask | undefined, INewTask, IReduxState>(
	'tasks/create',
	async (newTask, thunk) => {
		const toastId = toast.loading('Loading Tasks');
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) throw new Error('User not logged in');
			const userId = userState.user.id;

			const response = await TasksApi.put<TasksServerResponse<string>>(
				`tasks/${userId}`,
				{ ...newTask, user: userId }
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}
			toast.success('Task Created', {
				id: toastId,
			});
			return { ...newTask, id: response.data.data };
		} catch (error: any) {
			console.error(error);
			toast.error(error.message, {
				id: toastId,
			});
			return undefined;
		}
	}
);

const updateTask = createAsyncThunk<
	ITaskUpdate | undefined,
	ITaskUpdate,
	IReduxState
>('tasks/update', async (update, thunk) => {
	const toastId = toast.loading('Loading Tasks');
	try {
		const userState = thunk.getState().user;
		if (userState.user === undefined) throw new Error('User not logged in');
		const userId = userState.user.id;

		const response = await TasksApi.post<TasksServerResponse<boolean>>(
			`tasks/${userId}/${update.id}`,
			{ ...update, user: userId }
		);

		if (response.data.error) {
			throw new Error(response.data.data);
		}
		toast.success('Task Updated', {
			id: toastId,
		});
		return update;
	} catch (error: any) {
		console.error(error);
		toast.error(error.message, {
			id: toastId,
		});
		return undefined;
	}
});

const deleteTask = createAsyncThunk<string, string, IReduxState>(
	'tasks/delete',
	async (taskId, thunk) => {
		const toastId = toast.loading('Loading Tasks');
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) throw new Error('User not logged in');
			const userId = userState.user.id;

			const response = await TasksApi.delete<TasksServerResponse<boolean>>(
				`tasks/${userId}/${taskId}`
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}
			toast.success('Task Deleted', {
				id: toastId,
			});
			return taskId;
		} catch (error: any) {
			console.error(error);
			toast.error(error.message, {
				id: toastId,
			});
			return '';
		}
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTaskBeingEdited: (
			state,
			action: PayloadAction<ITaskSliceState['taskBeingEdited']>
		) => {
			state.taskBeingEdited = action.payload;
		},
		setSortIndex: (state, action: PayloadAction<number>) => {
			state.sortIndex = action.payload;
			toast.success(`Sorted Tasks By ${SORT_TYPES[action.payload]}`);
		},
	},
	extraReducers(builder) {
		builder.addCase(loadTasks.fulfilled, (state, action) => {
			state.tasks = action.payload.reduce<ITaskSliceState['tasks']>(
				(total, current) => {
					total[current.id] = current;
					return total;
				},
				{}
			);
		});
		builder.addCase(createTask.fulfilled, (state, action) => {
			if (action.payload) {
				state.tasks[action.payload.id] = action.payload;
			}
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			if (action.payload) {
				const existing = state.tasks[action.payload.id];
				if (existing) {
					state.tasks[action.payload.id] = {
						...existing,
						...action.payload,
					};
				}
			}
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			if (action.payload) {
				delete state.tasks[action.payload];
			}
		});
	},
});

export default tasksSlice.reducer;
export const { setTaskBeingEdited, setSortIndex } = tasksSlice.actions;
export { loadTasks, createTask, updateTask, deleteTask };
