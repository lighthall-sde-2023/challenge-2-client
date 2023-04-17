import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	IReduxState,
	ITask,
	ITaskSliceState,
	TasksServerResponse,
} from '../types';
import { TasksApi } from '../api';

export interface ILoadTasksConfig {
	query: string;
	order: 'due' | 'status';
}

export type ITaskUpdate = Pick<ITask, 'id'> & Partial<ITask>;

export type INewTask = Pick<ITask, 'description' | 'due_date' | 'title'>;

const initialState: ITaskSliceState = {
	tasks: {},
	taskIds: [],
};

const loadTasks = createAsyncThunk<ITask[], ILoadTasksConfig, IReduxState>(
	'tasks/load',
	async ({ query }, thunk) => {
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) return [];
			const userId = userState.user.id;

			const response = await TasksApi.get<TasksServerResponse<ITask[]>>(
				`tasks/${userId}`
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}

			return response.data.data;
		} catch (error) {
			return [];
		}
	}
);

const createTask = createAsyncThunk<ITask | undefined, INewTask, IReduxState>(
	'tasks/update',
	async (newTask, thunk) => {
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) return undefined;
			const userId = userState.user.id;

			const response = await TasksApi.put<TasksServerResponse<string>>(
				`tasks/${userId}`,
				{ ...newTask, user: userId, status: 0 }
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}

			return { ...newTask, id: response.data.data, status: 0 };
		} catch (error) {
			return undefined;
		}
	}
);

const updateTask = createAsyncThunk<
	ITaskUpdate | undefined,
	ITaskUpdate,
	IReduxState
>('tasks/update', async (update, thunk) => {
	try {
		const userState = thunk.getState().user;
		if (userState.user === undefined) return undefined;
		const userId = userState.user.id;

		const response = await TasksApi.post<TasksServerResponse<boolean>>(
			`tasks/${userId}/${update.id}`,
			{ ...update, user: userId }
		);

		if (response.data.error) {
			throw new Error(response.data.data);
		}

		return update;
	} catch (error) {
		return undefined;
	}
});

const deleteTask = createAsyncThunk<string, string, IReduxState>(
	'tasks/delete',
	async (taskId, thunk) => {
		try {
			const userState = thunk.getState().user;
			if (userState.user === undefined) return '';
			const userId = userState.user.id;

			const response = await TasksApi.delete<TasksServerResponse<boolean>>(
				`tasks/${userId}/${taskId}`
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}

			return taskId;
		} catch (error) {
			return '';
		}
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(loadTasks.fulfilled, (state, action) => {
			state.taskIds = action.payload.map((a) => a.id);
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
				state.taskIds.push(action.payload.id);
				state.tasks[action.payload.id] = action.payload;
			}
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			if (action.payload) {
				const existing = state.tasks[action.payload.id];
				if (existing) {
					state.tasks[action.payload.id] = {
						...action.payload,
						...existing,
					};
				}
			}
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			if (action.payload) {
				state.taskIds.splice(state.taskIds.indexOf(action.payload), 1);
				delete state.tasks[action.payload];
			}
		});
	},
});

export default tasksSlice.reducer;

export { loadTasks, createTask, updateTask, deleteTask };
