export interface IClickInfo {
	id: string;
	clicks: number;
}

export type TasksServerResponse<T = any> =
	| {
			error: false;
			data: T;
	  }
	| {
			error: true;
			data: string;
	  };

export interface ITask {
	id: string;
	title: string;
	description: string;
	status: 1 | 0;
	due_date: number;
}

export interface IUser {
	id: string;
}

export interface ITaskSliceState {
	tasks: { [key: string]: ITask | undefined };
	taskIds: string[];
}

export interface IUserSliceState {
	user: IUser | undefined;
}

export interface IReduxState {
	state: {
		tasks: ITaskSliceState;
		user: IUserSliceState;
	};
}
