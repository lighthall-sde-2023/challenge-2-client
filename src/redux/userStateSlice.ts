import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	IReduxState,
	IUser,
	IUserSliceState,
	TasksServerResponse,
} from '../types';
import { TasksApi } from '../api';

const initialState: IUserSliceState = {
	user: undefined,
};

const loginUser = createAsyncThunk<IUser | undefined, string, IReduxState>(
	'user/login',
	async (userId, thunk) => {
		try {
			const response = await TasksApi.post<TasksServerResponse<IUser>>(
				`users/${userId}`
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}

			return response.data.data;
		} catch (error) {
			return undefined;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state, payload) => {
			state.user = undefined;
		},
	},
	extraReducers(builder) {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload) {
				state.user = action.payload;
			}
		});
	},
});

export default userSlice.reducer;

export { loginUser };
export const { logoutUser } = userSlice.actions;
