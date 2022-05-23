interface Vertex {
    adjacent: Map<string, { [key: string]: string | number | boolean }>;

    [key: string]: string | number | boolean | Map<string, { [key: string]: string | number | boolean }>;
}

export function randomBetweenNumbers(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBetweenArray(...array: any[]) {
    const index = randomBetweenNumbers(array.length-1, 0);
    return [array[index], index];
}

class RandomizedQueue {
    private list: Set<string> = new Set<string>();
    private squaredSide: number = this.side**2;
    constructor(private side: number) {
    }
    put(adj: Map<string, { [key: string]: string | number | boolean }>) {
        for(const key of adj.keys()) {
            const k = parseInt(key);
            const isNotBorder = k >= this.side && k%this.side !== 0 && (k-this.side+1) % this.side !== 0 && k < this.squaredSide-this.side;
            if (isNotBorder) {
                this.list.add(key);
            }
        }
    }
    enqueue() {
        const index = randomBetweenNumbers(this.list.size-1, 0);
        const value = [...this.list.values()][index];
        this.list.delete(value);
        return value;
    }
    isEmpty() {
        return this.list.size === 0;
    }
    in(vertex: string) {
        return this.list.has(vertex);
    }
}

export function makeAGraphMaze(n) {
    const squaredN = n ** 2;
    const graph = new Graph();
    for (let i = 0; i < squaredN; i++) {
        if ((i-n+1) % n !== 0) {
            graph.addNoDirectedEdge(i.toString(), (i+1).toString(), {
                weight: 1
            });
        }
    }
    for (let i = 0; i < squaredN; i++) {
        if (i < squaredN-n) {
            graph.addNoDirectedEdge(i.toString(), (i+n).toString(), {
                weight: 1
            });
        }
    }
    graph.toValidMaze(n);
    return graph;
}

export class Graph {
    private graph = new Map<string, Vertex>();

    constructor() {
    }

    get vertices() {
        return this.graph.values();
    }

    addDirectedEdge(vertexA: string, vertexB: string, attributes?: { [key: string]: string | number | boolean }) {
        if (!this.graph.has(vertexA)) {
            return this.graph.set(vertexA, {
                adjacent: new Map<string, { [key: string]: string | number | boolean }>([[vertexB, {
                    ...attributes
                }]]),
                name: vertexA
            });
        }
        this.graph.get(vertexA).adjacent.set(vertexB, {
            ...attributes
        });
    }

    addNoDirectedEdge(vertexA: string, vertexB: string, attributes?: { [key: string]: string | number | boolean }) {
        this.addDirectedEdge(vertexA, vertexB, attributes);
        this.addDirectedEdge(vertexB, vertexA, attributes);
    }

    edge(vertexA: string, vertexB: string) {
        if (!this.graph.has(vertexA) || !this.graph.has(vertexB)) {
            return;
        }
        return this.graph.get(vertexA).adjacent.get(vertexB);
    }

    vertex(vertex: string) {
        if (!this.graph.has(vertex)) {
            return;
        }
        return this.graph.get(vertex);
    }

    hasEdge(vertexA: string, vertexB: string) {
        return this.graph.has(vertexA) &&
            this.graph.has(vertexB) &&
            this.graph.get(vertexA).adjacent.has(vertexB);
    }

    weight(vertexA: string, vertexB: string) {
        return this.edge(vertexA, vertexB)?.weight ?? Infinity;
    }

    isAdjacent(vertexA: string, vertexB: string) {
        return this.graph.has(vertexA) && this.graph.get(vertexA).adjacent.has(vertexB);
    }

    hasVertex(vertex: string) {
        return this.graph.has(vertex);
    }

    toValidMaze(side: number) {
        for(const vertex of this.vertices) {
            vertex["cost"] = Infinity;
        }
        const source = randomBetweenArray(
            randomBetweenNumbers(2*side-2,side+1),
            randomBetweenNumbers(3*side-2,2*side+1),
            randomBetweenNumbers(side*(side-2)+(side-2),side*(side-2)+1)
        )[0].toString();
        this.vertex(source).cost = 0;
        const visitedVertices = new Set<string>([source]);
        const queue = new RandomizedQueue(side);
        queue.put(this.getAdjacent(source));
        while(!queue.isEmpty()) {
            const wall = queue.enqueue();
            const n = Array
                .from(this.getAdjacent(wall).keys())
                .map((cell) => visitedVertices.has(cell))
                .filter((v)=> v)
                .length;
            if (n===1) {
                visitedVertices.add(wall);
                this.vertex(wall).cost = 0;
                queue.put(this.getAdjacent(wall));
            }
        }
        return this;
    }

    getAdjacent(vertex: string) {
        return this.graph.get(vertex).adjacent;
    }
}