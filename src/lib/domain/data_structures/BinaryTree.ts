export class BinaryTree<T> {
    constructor(private tree: T[] = []) {
    }

    get length() {
        return this.tree.length;
    }

    get root() {
        return this.tree[0];
    }

    private static setPosition(element: any, index: number) {
        // eslint-disable-next-line no-prototype-builtins
        if (element?.hasOwnProperty('_position')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            element.position = index;
        }
    }

    get(index: number) {
        return this.tree[index] ?? null;
    }

    set(index: number, value: T) {
        const previousValue = this.tree[index];
        this.tree[index] = value;
        return previousValue;
    }

    equals(array: T[]): boolean {
        if (array.length !== this.tree.length) {
            return false;
        }
        return this.tree.reduce<boolean>(
            (previousValuesAreEquals, currentValue, index) =>
                previousValuesAreEquals && currentValue === array[index],
            true
        );
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
        return Math.ceil(index/2)-1;
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
            BinaryTree.setPosition(this.tree[this.length - 1], this.length - 1);
        });
    }
}
