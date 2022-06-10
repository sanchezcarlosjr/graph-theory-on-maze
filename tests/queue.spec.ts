import {Queue} from "../src/lib/domain/data_structures/Queue";

describe("Queue", () => {
    it('should enqueue and dequeue', () => {
        const queue = new Queue<string>();
        queue.enqueue("A");
        queue.enqueue("B");
        queue.enqueue("C");
        queue.enqueue("D");
        expect(queue.dequeue()).toBe("A");
        expect(queue.dequeue()).toBe("B");
        expect(queue.dequeue()).toBe("C");
        expect(queue.dequeue()).toBe("D");
    });
    it("should iterate", () => {
        const queue = new Queue<string>("A", "B", "C", "D");
        const items = [];
        for (const item of queue) {
            items.push(item);
        }
        expect(items).toEqual(["A", "B", "C", "D"]);
        queue.enqueue("A");
        queue.enqueue("C");
        expect([...queue]).toEqual(["A", "C"]);
    });
    it("should became to array", () => {
        const queue = new Queue<string>();
        queue.enqueue("A");
        queue.enqueue("B");
        queue.dequeue();
        expect(queue.toArray()).toEqual(["B"]);
    });
})