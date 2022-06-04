import {PriorityQueue} from "../src/lib/domain/data_structures/PriorityQueue";

describe('Randomized priority queue', function () {
    it('should extract randomized peek', () => {
        const queue = new PriorityQueue();
        queue.insert("A", 0);
        queue.insert("B", Infinity);
        queue.insert("C", Infinity);
        queue.insert("D", Infinity);
        queue.insert("E", Infinity);
        expect(queue.extractPeek()).toBe("A");
        console.log(queue);
        expect(queue.extractPeek()).toBe("E");
    });
});