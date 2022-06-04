import {BinaryHeap} from "../src/lib/domain/data_structures/BinaryHeap";
import {BinaryTree} from "../src/lib/domain/data_structures/BinaryTree";
import {maxHeap} from "../src/lib/domain/data_structures/Heap";

describe('Heap', function () {
    describe('Binary heap', () => {
        it('should heapify top down', () => {
            const heap = new BinaryHeap(maxHeap, new BinaryTree(
                [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]
            ));
            heap.heapifyTopDown(1);
            expect(heap.equals([16, 14, 10, 8, 7, 9, 3, 2, 4, 1])).toBeTruthy();
        });
    });
});