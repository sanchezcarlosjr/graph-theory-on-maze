export function searchIndex(f: Comparator, ...objects: { index: Index, value: number | null }[]) {
    return objects[
        objects.reduce((best, x, i, arr) =>
            x.value != null && f(x.value, arr[best].value) ? i : best, 0)
        ].index;
}

type Index = number;
type Comparator = (a: number, b: number) => boolean;

export function minHeap(a: number, b: number): boolean {
    return a < b;
}

export function maxHeap(a: number, b: number): boolean {
    return a > b;
}

export abstract class Heap<T extends Number> {
    protected constructor(protected compare: Comparator = minHeap) {
    }

    abstract get size(): number;

    abstract get isEmpty(): boolean;

    abstract get peek(): T;

    abstract insert(...element: T[]);

    abstract extractPeek(): T
}