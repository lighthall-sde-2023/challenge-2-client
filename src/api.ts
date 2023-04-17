import axios from 'axios';
import { isDev } from './data';
export const TasksApi = axios.create({
	baseURL: isDev ? 'localhost:3001' : 'TBD',
});
