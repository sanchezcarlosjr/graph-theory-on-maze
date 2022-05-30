import {BinaryHeap, BinaryTree} from "../src/data_structures/BinaryHeap";
import {maxIndex, minIndex} from "../src/data_structures/Heap";

describe('Heaps', () => {
    describe('optimization function', () => {
        it('maxIndex should return array\'s max index', () => {
            expect(maxIndex(...[{
                index: 10, value: 1
            }])).toBe(10);
            expect(maxIndex(...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }])).toBe(6);
            expect(maxIndex(...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }, {
                index: 7, value: null
            }])).toBe(6);
            expect(maxIndex(...[{
                index: 11, value: -2
            }, {
                index: 6, value: -1
            }, {
                index: 7, value: null
            }])).toBe(6);
        });
        it('minIndex should return array\'s min index', () => {
            expect(minIndex(...[{
                index: 10, value: 1
            }])).toBe(10);
            expect(minIndex(...[{
                index: 11, value: 1
            }, {
                index: 6, value: 5
            }])).toBe(11);
            expect(minIndex(...[{
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
        binaryTree[0] = 4;
        expect(binaryTree[0]).toBe(4);
        expect(binaryTree[binaryTree.length]).toBe(null);
        expect(binaryTree[1]).toBe(2);
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
        it("should heapify case recursive", () => {
            const binaryHeap = new BinaryHeap(maxIndex);
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
            const binaryHeap = new BinaryHeap(maxIndex);
            binaryHeap.insert(4,1,3,2,16,9,10,14,8,7);
            binaryHeap.heapifyAll();
            expect(binaryHeap.equals([16, 14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
            expect(binaryHeap.peek).toBe(16);
        });
        it.only("should remove peek", () => {
            const binaryHeap = new BinaryHeap(maxIndex);
            binaryHeap.insert(16, 14, 10, 8, 7, 9, 3, 2, 4, 1);
            const peek = binaryHeap.extractPeek();
            expect(peek).toBe(16);
            expect(binaryHeap.equals([14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        })
    });
});