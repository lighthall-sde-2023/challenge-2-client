export function pad(a: number) {
	return a < 10 ? `0${a}` : `${a}`;
}

export function timestampToString(timestamp: number) {
	const date = new Date(timestamp * 1000);
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function stringToTimestamp(localDate: string) {
	const [date, time] = localDate.split('T');
	const [year, months, days] = date
		.split('-')
		.map((a) => parseInt(a.trim(), 10));
	const [hours, minutes] = time.split(':').map((a) => parseInt(a.trim(), 10));
	console.log(year, months, days, hours, minutes);
	return new Date(year, months - 1, days, hours, minutes).getTime() / 1000;
}
