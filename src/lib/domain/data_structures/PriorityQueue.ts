import { BinaryHeap } from './BinaryHeap';

export class Node extends Number {
	constructor(private _key: string, value: number, private _position: number = 0) {
		super(value);
	}

	get position(): number {
		return this._position;
	}

	set position(value: number) {
		if (value < 0) {
			return;
		}
		this._position = value;
	}

	get key() {
		return this._key;
	}
}

export class PriorityQueue {
	private nodes = new Map<string, Node>();

	constructor(private heap = new BinaryHeap<any>()) {}

	get peek() {
		return this.heap.peek.key;
	}

	get isEmpty() {
		return this.heap.isEmpty;
	}

	insert(key: string, value: number) {
		if (this.nodes.has(key)) {
			return;
		}
		const node = new Node(key, value);
		this.heap.insert(node);
		this.nodes.set(key, node);
	}

	extractPeek() {
		const node = this.heap.extractPeek();
		this.nodes.delete(node?.key);
		return node?.key;
	}

	changeKey(key: string, value: number) {
		if (!this.nodes.has(key)) {
			return;
		}
		let node = this.nodes.get(key) as Node;
		node = new Node(node.key, value, node.position);
		this.nodes.set(key, node);
		this.heap.set(node.position, node);
	}
}
