// https://dmitripavlutin.com/javascript-queue/
export class Queue<T> {
    private items: Map<number, T> = new Map<number, T>();
    private headIndex: number = 0;
    private tailIndex: number = 0;
    constructor(...items: T[]) {
        items.forEach((item) => this.enqueue(item));
    }
    enqueue(item: T) {
        this.items.set(this.tailIndex, item);
        this.tailIndex++;
    }
    dequeue() {
        const peek = this.peek;
        this.items.delete(this.headIndex);
        this.headIndex++;
        return peek;
    }
    get peek() {
        return this.items.get(this.headIndex);
    }
    get length() {
        return this.tailIndex - this.headIndex;
    }
    get isEmpty() {
        return this.length === 0;
    }
    toArray() {
        return Array.from(this.items.values());
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.isEmpty) {
                    return {
                        value: undefined,
                        done: true
                    }
                }
                return {
                    value: this.dequeue(),
                    done: false
                }
            }
        };
    }
}