import { type Comparator, Heap, minHeap, searchIndex} from './Heap';
import { BinaryTree } from './BinaryTree';

export class BinaryHeap<T extends number> extends Heap<T> {
	constructor(comparator: Comparator = minHeap, private binaryTree = new BinaryTree<any>()) {
		super(comparator);
	}

	get isEmpty(): boolean {
		return this.size === 0;
	}

	get peek(): T {
		return this.binaryTree.root;
	}

	get size(): number {
		return this.binaryTree.length;
	}

	extractPeek(): T {
		this.binaryTree.swap(0, this.binaryTree.length - 1);
		const peek = this.binaryTree.deleteTail();
		this.heapifyTopDown(0);
		return peek;
	}

	insert(element: T) {
		this.binaryTree.insert(element);
		const i = this.size - 1;
		this.heapifyBottomUp(i);
	}

	heapifyBottomUp(root: number) {
		while (
			root > 0 &&
			this.compare(this.binaryTree.get(root), this.binaryTree.get(this.binaryTree.parent(root)))
		) {
			this.binaryTree.swap(root, this.binaryTree.parent(root));
			root = this.binaryTree.parent(root);
		}
	}

	set(key: number, value: T) {
		this.binaryTree.set(key, value);
	}

	heapifyAll() {
		for (let i = Math.floor(this.size / 2); i >= 0; i--) {
			this.heapifyTopDown(i);
		}
	}

	equals(array: T[]): boolean {
		return this.binaryTree.equals(array);
	}

	heapifyTopDown(node: number) {
		let localNode;
		while(node !== (localNode = this.searchLocalNodeByComparison(node)) && localNode < this.size) {
			this.binaryTree.swap(node, localNode);
			node = localNode;
		}
	}

	private searchLocalNodeByComparison(root: number) {
		return searchIndex(
			this.compare,
			{
				index: root,
				value: this.binaryTree.get(root)
			},
			{
				index: this.binaryTree.getLeftIndex(root),
				value: this.binaryTree.get(this.binaryTree.getLeftIndex(root))
			},
			{
				index: this.binaryTree.getRightIndex(root),
				value: this.binaryTree.get(this.binaryTree.getRightIndex(root))
			}
		);
	}
}
