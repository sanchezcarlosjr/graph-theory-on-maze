import {type Comparator, Heap, minHeap, searchIndex} from './Heap';
import {BinaryTree} from './BinaryTree';

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
        this.siftDown(0);
        return peek;
    }

    insert(element: T) {
        this.binaryTree.insert(element);
        this.siftUp(this.size - 1);
    }

    siftUp(node: number) {
        while (node > 0 && this.compare(this.binaryTree.get(node), this.binaryTree.get(this.binaryTree.parent(node)))) {
            this.binaryTree.swap(node, this.binaryTree.parent(node));
            node = this.binaryTree.parent(node);
        }
    }

    set(key: number, value: T) {
        const previousValue = this.binaryTree.set(key, value);
        if (this.compare(value, previousValue)) {
            return this.siftUp(key);
        }
        this.siftDown(key);
        return previousValue;
    }


    heapify() {
        for (let i = Math.floor(this.size / 2); i >= 0; i--) {
            this.siftDown(i);
        }
    }

    equals(array: T[]): boolean {
        return this.binaryTree.equals(array);
    }

    siftDown(node: number) {
        let localNode;
        while (node !== (localNode = this.searchLocalNodeByComparison(node)) && localNode < this.size) {
            this.binaryTree.swap(node, localNode);
            node = localNode;
        }
    }

    private searchLocalNodeByComparison(root: number) {
        return searchIndex(this.compare, {
            index: root, value: this.binaryTree.get(root)
        }, {
            index: this.binaryTree.getLeftIndex(root), value: this.binaryTree.get(this.binaryTree.getLeftIndex(root))
        }, {
            index: this.binaryTree.getRightIndex(root), value: this.binaryTree.get(this.binaryTree.getRightIndex(root))
        });
    }
}
