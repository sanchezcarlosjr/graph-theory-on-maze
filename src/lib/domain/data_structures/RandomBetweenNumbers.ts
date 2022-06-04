export function randomBetweenNumbers(max: number, min: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBetweenArray(...array: any[]) {
	const index = randomBetweenNumbers(array.length - 1, 0);
	return [array[index], index];
}

export function randomArray(...array: any[]) {
	const newArray = [...array];
	for(let n=array.length-1; n>=1; n--) {
		const index = randomBetweenNumbers(n, 0);
		[newArray[n], newArray[index]] = [newArray[index], newArray[n]];
	}
	return [array, newArray];
}

export function randomBetweenSet(set: Set<any>) {
	const index = randomBetweenNumbers(set.size - 1, 0);
	const value = [...set.values()][index];
	return [value, index];
}
