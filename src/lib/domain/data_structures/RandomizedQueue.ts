import { randomBetweenSet } from './RandomBetweenNumbers';

export class RandomizedQueue {
	private list: Set<string> = new Set<string>();
	private readonly squaredSide: number = 0;

	constructor(private side: number) {
		this.squaredSide = this.side ** 2;
	}

	put(adj: Map<string, { [key: string]: string | number | boolean }>) {
		for (const key of adj.keys()) {
			const k = parseInt(key);
			const isNotBorder =
				k >= this.side &&
				k % this.side !== 0 &&
				(k - this.side + 1) % this.side !== 0 &&
				k < this.squaredSide - this.side;
			if (isNotBorder) {
				this.list.add(key);
			}
		}
	}

	enqueue() {
		const [value] = randomBetweenSet(this.list);
		this.list.delete(value);
		return value;
	}

	isEmpty() {
		return this.list.size === 0;
	}

	in(vertex: string) {
		return this.list.has(vertex);
	}
}
