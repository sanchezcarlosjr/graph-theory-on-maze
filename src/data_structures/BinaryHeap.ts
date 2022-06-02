import {Heap, searchIndex} from "./Heap";
import {BinaryTree} from "./BinaryTree";


export class BinaryHeap<T extends Number> extends Heap<T> {
    constructor(comparator = undefined, private binaryTree = new BinaryTree<any>()) {
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
        this.heapify(0);
        return peek;
    }

    insert(...elements: T[]) {
        elements.forEach((element) => {
            this.binaryTree.insert(element);
            let i = this.size - 1;
            this.heapifyFrom(i);
        });
    }

    heapifyFrom(i: number) {
        while (i > 0 && this.compare(this.binaryTree.get(i), this.binaryTree.get(this.binaryTree.parent(i)))) {
            this.binaryTree.swap(i, this.binaryTree.parent(i));
            i = this.binaryTree.parent(i);
        }
    }

    set(key: number, value: T) {
        this.binaryTree.set(key, value);
    }

    heapifyAll() {
        for (let i = Math.floor(this.size / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }

    equals(array: T[]): boolean {
        return this.binaryTree.equals(array);
    }

    heapify(root: number) {
        const newRoot = searchIndex(
            this.compare,
            {
                index: root, value: this.binaryTree.get(root)
            }, {
                index: this.binaryTree.getLeftIndex(root), value: this.binaryTree.get(this.binaryTree.getLeftIndex(root)),
            }, {
                index: this.binaryTree.getRightIndex(root), value: this.binaryTree.get(this.binaryTree.getRightIndex(root))
            });
        if (root !== newRoot && newRoot < this.size) {
            this.binaryTree.swap(root, newRoot);
            this.heapify(newRoot);
        }
    }
}