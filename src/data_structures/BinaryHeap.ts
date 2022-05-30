import {Heap} from "./Heap";

export class BinaryTree<T> {
    constructor(private tree: T[] = []) {
        return new Proxy(this, {
            set: (target: BinaryTree<T>, key, value) => {
                target.tree[key] = value;
                return value;
            }, get(target: BinaryTree<T>, key: string | symbol): any {
                if (typeof key === 'string' && Number.isInteger(parseInt(key))) {
                    return target.tree[key] ?? null;
                }
                return target[key];
            }
        });
    }

    get length() {
        return this.tree.length;
    }

    get root() {
        return this.tree[0];
    }


    equals(array: T[]): boolean {
        if (array.length !== this.tree.length) {
            return false;
        }
        return this.tree.reduce((previousValue, currentValue, index) => currentValue === array[index], true);
    }

    swap(i: number, j: number) {
        [this.tree[i], this.tree[j]] = [this.tree[j], this.tree[i]];
    }

    deleteRoot() {
        const root = this.tree[0];
        this.tree.shift();
        return root;
    }

    parent(index: number) {
        return Math.floor(index);
    }

    getLeftIndex(index: number) {
        return 2 * index + 1;
    }

    getRightIndex(index: number) {
        return 2 * index + 2;
    }

    insert(...elements: T[]) {
        this.tree.push(...elements);
    }
}


export class BinaryHeap<T> extends Heap<T> {
    constructor(comparator = undefined, private binaryTree = new BinaryTree<T>()) {
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
        const root = this.binaryTree.deleteRoot();
        this.heapifyAll();
        return root;
    }

    insert(...element: T[]) {
        this.binaryTree.insert(...element);
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
        const newRoot = this.comparator({
            index: root, value: this.binaryTree[root]
        }, {
            index: this.binaryTree.getLeftIndex(root), value: this.binaryTree[this.binaryTree.getLeftIndex(root)],
        }, {
            index: this.binaryTree.getRightIndex(root), value: this.binaryTree[this.binaryTree.getRightIndex(root)]
        });
        if (root !== newRoot && newRoot < this.size) {
            this.binaryTree.swap(root, newRoot);
            this.heapify(newRoot);
        }
    }
}