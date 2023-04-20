import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Countdown from './Countdown';
export default function TaskItem() {
	return (
		<div className="task-item">
			<span className="task-title">
				<h3>Title</h3>
			</span>
			<span className="task-info">
				<FiEdit />
				<span className="task-status">
					<h3>Status</h3>
					<Countdown />
				</span>
			</span>
		</div>
	);
}
