import {BinaryHeap} from "../src/lib/domain/data_structures/BinaryHeap";
import {BinaryTree} from "../src/lib/domain/data_structures/BinaryTree";
import {maxHeap, minHeap} from "../src/lib/domain/data_structures/Heap";
import {PriorityQueue} from "../src/lib/domain/data_structures/PriorityQueue";

describe('Heap', function () {
    describe('Binary Tree', () => {
        it('should get parent', () => {
            const tree = new BinaryTree([16, 4, 10, 14, 7, 9, 3, 2, 8, 1]);
            expect(tree.parent(1)).toBe(0);
            expect(tree.parent(2)).toBe(0);
            expect(tree.parent(tree.length - 2)).toBe(3);
            expect(tree.parent(tree.length - 3)).toBe(3);
        });
    });
    describe('Binary heap', () => {
        it("should set node and keep max heap property when it increases", () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree([20, 16, 10, 14, 7, 9, 3, 2, 4, 1]));
            heap.set(1, 30);
            expect(heap.equals([30, 20, 10, 14, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
        it("should set node and keep max heap property when it decrease", () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree([20, 16, 10, 14, 7, 9, 3, 2, 4, 1]));
            heap.set(1, -1);
            expect(heap.equals([20, 14, 10, 4, 7, 9, 3, 2, -1, 1])).toBeTruthy();
        });
        it("should set node and keep min heap property when it increases", () => {
            const heap = new BinaryHeap(minHeap, new BinaryTree([1, 2, 3, 4, 7, 9, 10, 14, 20, 16]));
            heap.set(5, -1);
            expect(heap.equals([-1, 2, 1, 4, 7, 3, 10, 14, 20, 16])).toBeTruthy();
        });
        it("should set node and keep min heap property when it decrease", () => {
            const heap = new BinaryHeap(minHeap, new BinaryTree([1, 2, 3, 4, 7, 9, 10, 14, 20, 16, 50, 70]));
            heap.set(2, 100);
            expect(heap.equals([1, 2, 9, 4, 7, 70, 10, 14, 20, 16, 50, 100])).toBeTruthy();
        });
        it('should sift a node top down', () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree([16, 4, 10, 14, 7, 9, 3, 2, 8, 1]));
            heap.siftDown(1);
            expect(heap.equals([16, 14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
        it('should sift top down a node with infinity', () => {
            const heap = new BinaryHeap(minHeap, new BinaryTree([Infinity, 0, Infinity, -1, 10, Infinity, 10, Infinity, 1000]));
            heap.siftDown(1);
            expect(heap.equals([Infinity, -1, Infinity, 0, 10, Infinity, 10, Infinity, 1000])).toBeTruthy();
        });
        it('should sift a node bottom up', () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree([16, 4, 10, 14, 7, 9, 3, 2, 20, 1]));
            heap.siftUp(heap.size - 2);
            expect(heap.equals([20, 16, 10, 4, 7, 9, 3, 2, 14, 1])).toBeTruthy();
        });
        it("should keep heap property when client inserts", () => {
            const heap = new BinaryHeap(maxHeap);
            [16, 4, 10, 14, 7, 9, 3, 2, 20, 1].forEach((element) => {
                heap.insert(element);
            });
            expect(heap.equals([20, 16, 10, 14, 7, 9, 3, 2, 4, 1])).toBeTruthy();
            heap.insert(Infinity);
            expect(heap.equals([Infinity, 20, 10, 14, 16, 9, 3, 2, 4, 1, 7])).toBeTruthy();
            heap.insert(10);
            expect(heap.equals([Infinity, 20, 10, 14, 16, 10, 3, 2, 4, 1, 7, 9])).toBeTruthy();
        });
        it("should keep heap property when client build heap all", () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree([16, 4, 10, 14, 7, 9, 3, 2, 20, 1]));
            heap.heapify();
            expect(heap.equals([20, 16, 10, 14, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
    });
    describe("Priority Queue", () => {
        it("should extract min element - case 1", () => {
            const queue = new PriorityQueue();
            queue.insert("A", 0);
            queue.insert("B", -1);
            queue.insert("C", -2);
            expect(queue.extractPeek()).toBe("C");
            expect(queue.extractPeek()).toBe("B");
            expect(queue.extractPeek()).toBe("A");
        });
        it("should extract min element - case 2", () => {
            const queue = new PriorityQueue();
            queue.insert("A", Infinity);
            queue.insert("B", Infinity);
            queue.insert("C", 1);
            queue.insert("D", 1);
            queue.insert("E", 2);
            queue.insert("F", 3);
            queue.insert("G", -1);
            queue.insert("H", -2);
            queue.insert("I", 100);
            expect(queue.extractPeek()).toBe("H");
            expect(queue.extractPeek()).toBe("G");
            expect(queue.extractPeek()).toBe("D");
            expect(queue.extractPeek()).toBe("C");
            expect(queue.extractPeek()).toBe("E");
            expect(queue.extractPeek()).toBe("F");
            expect(queue.extractPeek()).toBe("I");
            expect(queue.extractPeek()).toBe("B");
            expect(queue.extractPeek()).toBe("A");
        });
        it("should change element and keep heap property - case 1", () => {
            const queue = new PriorityQueue();
            queue.insert("A", Infinity);
            queue.insert("B", Infinity);
            queue.insert("C", 1);
            queue.insert("D", 1);
            queue.insert("E", 2);
            queue.insert("F", 3);
            queue.insert("G", -1);
            queue.insert("H", -2);
            queue.insert("I", 100);
            queue.replace("A", -5);
            expect(queue.extractPeek()).toBe("A");
            queue.replace("B", -3);
            expect(queue.extractPeek()).toBe("B");
            queue.replace("I", 6);
            expect(queue.extractPeek()).toBe("H");
        });
    });
});