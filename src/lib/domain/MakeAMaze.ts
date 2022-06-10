import { Graph } from './data_structures/Graph';
import { RandomizedQueue } from './data_structures/RandomizedQueue';
import {
	randomBetweenArray,
	randomBetweenNumbers,
	randomBetweenSet
} from './data_structures/RandomBetweenNumbers';

export function makeAMaze(n: number) {
	const maze = new Maze(n);
	maze.buildBorders();
	const [source, goal] = maze.buildByPrim();
	return [maze, source, goal];
}

export class Maze extends Graph {
	constructor(private side: number) {
		super();
	}

	buildByPrim() {
		const source = this.findRandomSourceForMaze();
		this.initialize_single_source(source, 'cost');
		const visitedVertices = new Set<string>([source]);
		const queue = new RandomizedQueue(this.side);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		queue.put(this.getAdjacent(source));
		while (!queue.isEmpty()) {
			const wall = queue.enqueue();
			const n = Array
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.from(this.getAdjacent(wall).keys())
				.map((cell) => visitedVertices.has(cell))
				.filter((v) => v).length;
			if (n === 1) {
				visitedVertices.add(wall);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				this.vertex(wall).cost = 0;
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				queue.put(this.getAdjacent(wall));
			}
		}
		visitedVertices.delete(source);
		const [goal] = randomBetweenSet(visitedVertices);
		return [source, goal];
	}

	isNotBorder(i: number) {
		return i >= this.side &&
			i % this.side !== 0 &&
			(i - this.side + 1) % this.side !== 0 &&
			i < this.side**2 - this.side;
	}

	isWall(vertex: string) {
		return this.vertex(vertex)?.cost === Infinity;
	}

	toEuclidean(i: string) {
		const vertex = parseInt(i);
		return [vertex%this.side, Math.floor(vertex/this.side)];
	}

	buildBorders() {
		for (let i = 0; i < this.side ** 2; i++) {
			if ((i - this.side + 1) % this.side !== 0) {
				this.addNoDirectedEdge(i.toString(), (i + 1).toString(), {
					weight: 1
				});
			}
		}
		for (let i = 0; i < this.side ** 2; i++) {
			if (i < this.side ** 2 - this.side) {
				this.addNoDirectedEdge(i.toString(), (i + this.side).toString(), {
					weight: 1
				});
			}
		}
	}

	private findRandomSourceForMaze() {
		const validSources = [];
		for (let i = 0; i < this.side - 2; i++) {
			validSources.push(randomBetweenNumbers((i + 2) * this.side - 2, (i + 1) * this.side + 1));
		}
		return randomBetweenArray(...validSources)[0].toString();
	}
}
