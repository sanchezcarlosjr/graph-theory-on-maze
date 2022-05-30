export function maxIndex(...objects: {index: Index, value: number|null}[]) {
    return objects[objects.reduce(
        (iMax, x, i, arr) =>
            x.value != null && x.value > arr[iMax].value ? i : iMax, 0
    )].index;
}

export function minIndex(...objects: {index: Index, value: number|null}[]) {
    return objects[objects.reduce(
        (iMin, x, i, arr) =>
            x.value != null && x.value < arr[iMin].value ? i : iMin, 0
    )].index;
}

type Index = number;
type Comparator = (...objects: {index: Index, value: number|null}[]) => Index;

export abstract class Heap<T> {
    protected constructor(protected comparator: Comparator = minIndex) {
    }
    abstract get size(): number;
    abstract get isEmpty(): boolean;
    abstract insert(...element: T[]);
    abstract get peek(): T;
    abstract extractPeek(): T
}