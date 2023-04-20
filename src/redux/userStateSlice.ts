import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	IReduxState,
	IUser,
	IUserSliceState,
	TasksServerResponse,
} from '../types';
import { TasksApi } from '../api';
import { toast } from 'react-hot-toast';
const initialState: IUserSliceState = {
	user: {
		id: 'TareHimself',
	},
};

const loginUser = createAsyncThunk<IUser | undefined, string, IReduxState>(
	'user/login',
	async (userId, thunk) => {
		const toastId = toast.loading('Loggin in');
		try {
			const response = await TasksApi.get<TasksServerResponse<IUser>>(
				`users/${userId}`
			);

			if (response.data.error) {
				throw new Error(response.data.data);
			}
			toast.success('Logged in', {
				id: toastId,
			});
			return response.data.data;
		} catch (error: any) {
			toast.error(error.message, {
				id: toastId,
			});
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
