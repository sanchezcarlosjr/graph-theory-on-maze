interface Vertex {
    adjacent: Map<string, { [key: string]: string | number | boolean }>;

    [key: string]: string | number | boolean | Map<string, { [key: string]: string | number | boolean }>;
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
        if (i < squaredN-n) {
            graph.addNoDirectedEdge(i.toString(), (i+n).toString(), {
                weight: 1
            });
        }
    }
    graph.toValidMaze();
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
                }]])
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

    toValidMaze() {
        for(const vertex of this.vertices) {
            vertex["cost"] = Infinity;
        }
        return this;
    }

    getAdjacent(vertex: string) {
        return this.graph.get(vertex).adjacent;
    }
}