import React from 'react';
import { timestampToString } from '../../utils';
export interface ICountdownProps {
	date: number;
}
export default function Countdown({ date }: ICountdownProps) {
	const dateObj = new Date(date * 1000);
	return (
		<h3>{`${dateObj.toLocaleDateString()} ${dateObj
			.toLocaleTimeString()
			.replaceAll(':00', '')}`}</h3>
	);
}
