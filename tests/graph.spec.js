import {Graph, Vertex} from "../src/Graph";

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
});