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

export function randomBetweenSet(set: Set<any>) {
    const index = randomBetweenNumbers(set.size-1, 0);
    const value = [...set.values()][index];
    return [value, index];
}

export function findRandomSourceForMaze(side: number) {
    const validSources = [];
    for(let i=0; i<side-2; i++) {
        validSources.push(randomBetweenNumbers((i+2)*side - 2, (i+1)*side + 1));
    }
    return randomBetweenArray(...validSources);
}

class RandomizedQueue {
    private list: Set<string> = new Set<string>();
    private readonly squaredSide: number = 0;
    constructor(private side: number) {
        this.squaredSide = this.side**2;
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
        const [value] = randomBetweenSet(this.list);
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

export function makeAGraphMaze(n: number) {
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
    const [source, goal] = graph.toValidMaze(n);
    return [graph, source, goal];
}

export class Graph {
    private graph = new Map<string, Vertex>();

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
        this.graph.get(vertexA)?.adjacent.set(vertexB, {
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
        return this.graph.get(vertexA)?.adjacent.get(vertexB);
    }

    vertex(vertex: string) {
        vertex = vertex.toString();
        if (!this.graph.has(vertex)) {
            throw  new Error(`${vertex} is not in graph`);
        }
        return this.graph.get(vertex);
    }

    reconstruct_path(goal: string) {
        let path: string[] = [];
        let actualVertex = goal;
        while(actualVertex !== undefined) {
            path = [actualVertex, ...path];
            actualVertex  = this.vertex(actualVertex)?.predecessor as string;
        }
        return path;
    }

    hasEdge(vertexA: string, vertexB: string) {
        return this.graph.has(vertexA) &&
            this.graph.has(vertexB) &&
            this.graph.get(vertexA)?.adjacent.has(vertexB);
    }

    weight(vertexA: string, vertexB: string): number {
        return this.edge(vertexA, vertexB)?.weight as number ?? Infinity;
    }

    isAdjacent(vertexA: string, vertexB: string) {
        return this.graph.has(vertexA) && this.graph.get(vertexA)?.adjacent.has(vertexB);
    }

    hasVertex(vertex: string) {
        return this.graph.has(vertex);
    }

    relax(u: string, v: string) {
        const newDistance  =  this.vertex(v)?.cost as number+(this.vertex(u)?.distance as number)+this.weight(u,v);
        if(newDistance === Infinity) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (this.vertex(v).distance > newDistance) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.vertex(v).distance = newDistance;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.vertex(v).predecessor = u;
            return true;
        }
        return false;
    }

    toValidMaze(side: number) {
        for(const vertex of this.vertices) {
            vertex["cost"] = Infinity;
        }
        const source = findRandomSourceForMaze(side)[0].toString();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.vertex(source).cost = 0;
        const visitedVertices = new Set<string>([source]);
        const queue = new RandomizedQueue(side);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        queue.put(this.getAdjacent(source));
        while(!queue.isEmpty()) {
            const wall = queue.enqueue();
            const n = Array
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .from(this.getAdjacent(wall).keys())
                .map((cell) => visitedVertices.has(cell))
                .filter((v)=> v)
                .length;
            if (n===1) {
                visitedVertices.add(wall);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.vertex(wall).cost = 0;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                queue.put(this.getAdjacent(wall));
            }
        }
        visitedVertices.delete(source);
        const [goal] = randomBetweenSet(visitedVertices);
        return [source, goal];
    }

    initialize_single_source(source: string) {
        for(const vertex of this.vertices) {
            vertex.distance = Infinity;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.vertex(source).distance = 0;
    }

    getAdjacent(vertex: string) {
        return this.graph.get(vertex)?.adjacent;
    }
}