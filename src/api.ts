import axios from 'axios';
import { isDev } from './data';
export const TasksApi = axios.create({
	baseURL: isDev
		? 'http://localhost:3001/'
		: 'https://challenge-2-server.oyintareebelo.repl.co',
});
