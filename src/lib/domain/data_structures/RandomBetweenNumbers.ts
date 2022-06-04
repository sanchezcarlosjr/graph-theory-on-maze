export function randomBetweenNumbers(max: number, min: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBetweenArray(...array: any[]) {
	const index = randomBetweenNumbers(array.length - 1, 0);
	return [array[index], index];
}

export function randomBetweenSet(set: Set<any>) {
	const index = randomBetweenNumbers(set.size - 1, 0);
	const value = [...set.values()][index];
	return [value, index];
}
