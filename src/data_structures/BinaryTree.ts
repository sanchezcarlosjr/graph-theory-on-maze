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

    private static setPosition(element, index) {
        if (element.hasOwnProperty("position")) {
            // @ts-ignore
            element.position = index;
        }
    }

    equals(array: T[]): boolean {
        if (array.length !== this.tree.length) {
            return false;
        }
        return this.tree.reduce((previousValue, currentValue, index) => currentValue === array[index], true);
    }

    swap(i: number, j: number) {
        [this.tree[i], this.tree[j]] = [this.tree[j], this.tree[i]];
        BinaryTree.setPosition(this.tree[i], i);
        BinaryTree.setPosition(this.tree[j], j);
    }

    deleteRoot() {
        const root = this.tree[0];
        this.tree.shift();
        return root;
    }

    deleteTail() {
        return this.tree.pop();
    }

    parent(index: number) {
        return Math.floor(index / 2);
    }

    getLeftIndex(index: number) {
        return 2 * index + 1;
    }

    getRightIndex(index: number) {
        return 2 * index + 2;
    }

    insert(...elements: T[]) {
        elements.forEach((element) => {
            this.tree.push(element);
        });
    }
}