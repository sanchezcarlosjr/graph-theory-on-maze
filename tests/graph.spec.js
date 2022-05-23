import {Graph, makeAGraphMaze, Vertex} from "../src/Graph";

describe("Graph", () => {
    it("should add edge", () => {
        const graph = new Graph();
        graph.addNoDirectedEdge("A", "B");
        expect(graph.isAdjacent("A", "B")).toBeTruthy();
        expect(graph.isAdjacent("B", "A")).toBeTruthy();
        expect(graph.isAdjacent("A", "C")).toBeFalsy();
        expect(graph.isAdjacent("C", "A")).toBeFalsy();
        expect(graph.hasVertex("A")).toBeTruthy();
        expect(graph.hasVertex("B")).toBeTruthy();
        expect(graph.hasVertex("C")).toBeFalsy();
        graph.addNoDirectedEdge("A", "C");
        expect(graph.isAdjacent("A", "C")).toBeTruthy();
        expect(graph.isAdjacent("C", "A")).toBeTruthy();
        expect(graph.hasVertex("C")).toBeTruthy();
        expect(graph.isAdjacent("A", "B")).toBeTruthy();
        expect(graph.isAdjacent("B", "A")).toBeTruthy();
    });
    it("should add edge with weight", () => {
        const graph = new Graph();
        graph.addNoDirectedEdge("A", "B", {
            weight: 2
        });
        expect(graph.edge("A", "B")).toEqual({
            weight: 2
        });
        expect(graph.edge("B", "A")).toEqual({
            weight: 2
        });
    });
    it("should iterate vertices", () => {
        const graph = new Graph();
        graph.addNoDirectedEdge("A", "B", {
            weight: 2
        });
        graph.addNoDirectedEdge("A", "C", {
            weight: 1
        });
        graph.addNoDirectedEdge("C", "D", {
            weight: 0
        });
        for (const vertex of graph.vertices) {
            vertex.key = 10;
        }
        for (const vertex of graph.vertices) {
            expect(vertex?.key).toEqual(10);
        }
    });
    it("should get weight", () => {
        const graph = new Graph();
        graph.addNoDirectedEdge("A", "B", {
            weight: 2
        });
        expect(graph.weight("A", "B")).toEqual(2);
        expect(graph.weight("A", "C")).toEqual(Infinity);
    });
    it("should transform maze to graph", () => {
        const graph = makeAGraphMaze(4);
        expect(graph.hasEdge("0", "1")).toBeTruthy();
        expect(graph.hasEdge("1", "2")).toBeTruthy();
        expect(graph.hasEdge("2", "3")).toBeTruthy();
        expect(graph.hasEdge("3", "7")).toBeTruthy();
        expect(graph.hasEdge("5", "6")).toBeTruthy();
        expect(graph.hasEdge("5", "4")).toBeTruthy();
        expect(graph.hasEdge("5", "9")).toBeTruthy();
        expect(graph.hasEdge("0", "4")).toBeTruthy();
        expect(graph.hasEdge("4", "8")).toBeTruthy();
        expect(graph.hasEdge("11", "15")).toBeTruthy();
        expect(graph.hasEdge("8", "12")).toBeTruthy();
        expect(graph.hasEdge("3", "4")).toBeFalsy();
        expect(graph.hasEdge("7", "8")).toBeFalsy();
        expect(graph.hasEdge("12", "16")).toBeFalsy();
        expect(graph.hasEdge("15", "16")).toBeFalsy();
        expect(graph.hasEdge("15", "19")).toBeFalsy();
    });
});