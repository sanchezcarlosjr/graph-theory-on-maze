interface Vertex {
    adjacent: Map<string, {[key: string]: string|number|boolean}>;
    [key: string]: string|number|boolean|Map<string, {[key: string]: string|number|boolean}>;
}

export class Graph {
    private graph = new Map<string, Vertex>();
    constructor() {
    }

    addDirectedEdge(vertexA: string, vertexB: string, attributes?: {[key: string]: string|number|boolean}) {
        if(!this.graph.has(vertexA)) {
            return this.graph.set(vertexA, {
                adjacent: new Map<string, {[key: string]: string|number|boolean}>([[vertexB, {
                    ...attributes
                }]])
            });
        }
        this.graph.get(vertexA).adjacent.set(vertexB, {
            ...attributes
        });
    }

    addNoDirectedEdge(vertexA: string, vertexB: string, attributes?: {[key: string]: string|number|boolean}) {
        this.addDirectedEdge(vertexA, vertexB, attributes);
        this.addDirectedEdge(vertexB, vertexA, attributes);
    }

    edge(vertexA: string, vertexB: string) {
        if(!this.graph.has(vertexA) || !this.graph.has(vertexB)) {
            return;
        }
        return this.graph.get(vertexA).adjacent.get(vertexB);
    }

    isAdjacent(vertexA: string, vertexB: string) {
        return this.graph.has(vertexA) && this.graph.get(vertexA).adjacent.has(vertexB);
    }

    hasVertex(vertex: string) {
        return this.graph.has(vertex);
    }
    toAdjacencyMatrix() {
        return ["a", "b"];
    }
}