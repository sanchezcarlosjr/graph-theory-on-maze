export class BinaryHeap {
    private heap: number[] = [];

    insert(number: number) {
        this.heap[0] = number;
    }

    findMin() {
        return this.heap[0];
    }
}