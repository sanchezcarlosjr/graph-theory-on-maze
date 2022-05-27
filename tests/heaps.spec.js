import {BinaryHeap} from "../src/data_structures/BinaryHeap";

describe('Heaps', () => {
    describe('Binary Heap', () => {
        it("it should insert", () => {
            const binaryHeap = new BinaryHeap();
            binaryHeap.insert(10);
            binaryHeap.insert(1);
            binaryHeap.insert(100);
            expect(binaryHeap.findMin()).toBe(1);
        });
    });
});