import {algorithms, build_function} from "../src/algorithms";
import {PriorityQueue} from "../src/data_structures/PriorityQueue";
import {Graph} from "../src/data_structures/Graph";

global.PriorityQueue = PriorityQueue;


function makeAFakeGraphMaze(vertices = [], n = 5) {
    const squaredN = n ** 2;
    const graph = new Graph();
    for (let i = 0; i < squaredN; i++) {
        if ((i - n + 1) % n !== 0) {
            graph.addNoDirectedEdge(i.toString(), (i + 1).toString(), {
                weight: 1
            });
        }
    }
    for (let i = 0; i < squaredN; i++) {
        if (i < squaredN - n) {
            graph.addNoDirectedEdge(i.toString(), (i + n).toString(), {
                weight: 1
            });
        }
    }
    for (const vertex of graph.vertices) {
        vertex["cost"] = Infinity;
    }
    for (const vertex of vertices) {
        graph.vertex(vertex).cost = 0;
    }
    return graph;
}

function dijkstra(graph, source, goal) {
    const algorithm = algorithms[0].algorithm;
    const f = build_function(algorithm);
    return f(graph, source, goal);
}

describe('Algorithms', () => {
    it('should load queue', async () => {
        const algorithm = algorithms[0].algorithm;
        const f = build_function(algorithm);
        expect(() => f("g", "G")).not.toThrowError('ReferenceError: PriorityQueue is not defined');
    });
    describe('Dijkstra', () => {
        it('should find path case 1', () => {
            const graph = makeAFakeGraphMaze(
                ["6", "8", "11", "12", "13", "16", "18"]
            );
            const path = dijkstra(graph, "18", "6");
            expect(path).toEqual(["18", "13", "12", "11", "6"])
        });
        it('should find path case 2', () => {
            const graph = makeAFakeGraphMaze(
                ["6", "8", "11", "12", "13", "16", "18"]
            );
            const path = dijkstra(graph, "13", "11");
            expect(path).toEqual(["13", "12", "11"]);
        });
        it('should find path case 3', () => {
            const graph = makeAFakeGraphMaze(
                ["6", "11", "12", "17", "18"]
            );
            const path = dijkstra(graph, "11", "6");
            expect(path).toEqual(["11", "6"]);
        });
        it('should find path case 4', () => {
            const graph = makeAFakeGraphMaze(
                ["6", "8", "11", "12", "13", "16", "18"]
            );
            const path = dijkstra(graph, "6", "13");
            expect(path).toEqual(["6", "11", "12", "13"]);
        });
    });
})