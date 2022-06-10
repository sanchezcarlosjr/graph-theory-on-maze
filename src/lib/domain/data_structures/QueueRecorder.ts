import {Queue} from "./Queue";

export class QueueRecorder<T> {
    private _records = new Set<any>();
    private queue: Queue<T> = new Queue<T>();
    enqueue(item: T, key?: number|string) {
        let newKey = key ?? item as T;
        const itemWasRecorded = !this._records.has(newKey);
        if (itemWasRecorded) {
            this._records.add(newKey);
            this.queue.enqueue(item);
        }
        return itemWasRecorded;
    }
    dequeue() {
        return this.queue.dequeue();
    }
    toArray() {
        return this.queue.toArray();
    }
    get isEmpty() {
        return this.queue.isEmpty;
    }
    countRecords() {
        return this._records.size;
    }
}