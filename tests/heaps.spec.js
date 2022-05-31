import {BinaryHeap} from "../src/data_structures/BinaryHeap";
import {maxHeap, minHeap, searchIndex} from "../src/data_structures/Heap";
import {Node, PriorityQueue} from "../src/data_structures/PriorityQueue";
import {BinaryTree} from "../src/data_structures/BinaryTree";

describe('Heaps', () => {
    describe('optimization function', () => {
        it('searchIndex should return array\'s max index', () => {
            expect(searchIndex(maxHeap, ...[{
                index: 10, value: 1
            }])).toBe(10);
            expect(searchIndex(maxHeap, ...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }])).toBe(6);
            expect(searchIndex(maxHeap, ...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }, {
                index: 7, value: null
            }])).toBe(6);
            expect(searchIndex(maxHeap, ...[{
                index: 11, value: -2
            }, {
                index: 6, value: -1
            }, {
                index: 7, value: null
            }])).toBe(6);
        });
        it('minIndex should return array\'s min index', () => {
            expect(searchIndex(minHeap, ...[{
                index: 10, value: 1
            }])).toBe(10);
            expect(searchIndex(minHeap, ...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }])).toBe(11);
            expect(searchIndex(minHeap, ...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }, {
                index: 7, value: null
            }])).toBe(11);
        });
    });
    describe("Binary tree", () => {
        const binaryTree = new BinaryTree([1, 2, 3, 4, 5, 6]);
        binaryTree.set(4, 0);
        expect(binaryTree.get(4)).toBe(0);
        expect(binaryTree.get(binaryTree.length)).toBe(null);
        expect(binaryTree.get(1)).toBe(2);
    });
    describe('Binary Heap', () => {
        it("should heapify base case", () => {
            const binaryHeap = new BinaryHeap();
            binaryHeap.insert(10);
            binaryHeap.insert(1);
            binaryHeap.insert(100);
            binaryHeap.heapify(0);
            expect(binaryHeap.peek).toBe(1);
        });
        it("should heapify all", () => {
            const tree = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1];
            const binaryHeap = new BinaryHeap(maxHeap, new BinaryTree(tree));
            expect(binaryHeap.equals(tree)).toBeTruthy();
            binaryHeap.heapifyAll();
            expect(binaryHeap.equals([16, 14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
        it("should heapify case recursive", () => {
            const binaryHeap = new BinaryHeap(maxHeap);
            binaryHeap.insert(16);
            binaryHeap.insert(4);
            binaryHeap.insert(10);
            binaryHeap.insert(14);
            binaryHeap.insert(7);
            binaryHeap.insert(9);
            binaryHeap.insert(3);
            binaryHeap.insert(2);
            binaryHeap.insert(8);
            binaryHeap.insert(1);
            binaryHeap.heapify(1);
            expect(binaryHeap.peek).toBe(16);
        });
        it("should heapify all", () => {
            const binaryHeap = new BinaryHeap(maxHeap);
            binaryHeap.insert(4, 1, 3, 2, 16, 9, 10, 14, 8, 7);
            expect(binaryHeap.equals([
                16, 14, 8, 10, 7,
                3, 2, 9, 1, 4
            ])).toBeTruthy();
            expect(binaryHeap.peek).toBe(16);
        });
        it("should remove peek", () => {
            const binaryHeap = new BinaryHeap(maxHeap);
            binaryHeap.insert(16, 14, 10, 8, 7, 9, 3, 2, 4, 1);
            const peek = binaryHeap.extractPeek();
            expect(peek).toBe(16);
            expect(binaryHeap.equals([14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
        it("should remove peek when it is a min heap", () => {
            const binaryHeap = new BinaryHeap();
            binaryHeap.insert(2, 17, 0, 1);
            expect(binaryHeap.peek).toBe(0);
            expect(binaryHeap.extractPeek()).toBe(0);
            expect(binaryHeap.peek).toBe(1);
        })
    });
    describe("PriorityQueue", () => {
        it('should behave like a number', () => {
            let node = new Node("1", 4);
            expect(node.key).toBe("1");
            expect(+node).toBe(4);
            expect(node + 1).toBe(5);
            expect(node > 3).toBeTruthy();
            expect(node < 6).toBeTruthy();
            expect(node == 4).toBeTruthy();
            expect(+node === 4).toBeTruthy();
            expect(node.key).toBe("1");
            expect(++node).toBe(5);
            expect(node.key).toBe(undefined);
            expect(--node).toBe(4);
        });
        it("should prioritize max", () => {
            const priorityQueue = new PriorityQueue(new BinaryHeap(maxHeap));
            priorityQueue.insert("ABC", 0);
            priorityQueue.insert("A", 1);
            priorityQueue.insert("X", 2);
            priorityQueue.insert("Y", 16);
            priorityQueue.insert("Y", 17);
            expect(priorityQueue.peek).toBe("Y");
        });
        it("should extract min", () => {
            const priorityQueue = new PriorityQueue();
            priorityQueue.insert("X", 2);
            priorityQueue.insert("Y", 17);
            priorityQueue.insert("ABC", 0);
            priorityQueue.insert("A", 1);
            expect(priorityQueue.extractPeek()).toBe("ABC");
            expect(priorityQueue.peek).toBe("A");
        });
        it("should change key", () => {
            const priorityQueue = new PriorityQueue();
            priorityQueue.insert("X", 2);
            priorityQueue.insert("Y", 17);
            priorityQueue.insert("ABC", 0);
            priorityQueue.insert("A", 1);
            expect(priorityQueue.peek).toBe("ABC");
            priorityQueue.changeKey("Y", -10);
            expect(priorityQueue.peek).toBe("Y");
        });
    });
});