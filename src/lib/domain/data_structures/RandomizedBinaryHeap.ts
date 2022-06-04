import {BinaryHeap} from "./BinaryHeap";

export class RandomizedBinaryHeap<T extends number> extends BinaryHeap<T> {
	private meld(nodeA: T, nodeB: T) {
		if (nodeB === undefined) {
			return nodeA;
		}
		if (nodeA === undefined) {
			return nodeB;
		}

	}
}
