import {Graph} from "../src/lib/domain/data_structures/Graph";
import {algorithms} from "../src/lib/infrastructure/database";
import {Algorithm} from "../src/lib/application/algorithm";
import type {AlgorithmRepository} from "../src/lib/domain/algorithm";

describe("Algorithms", () => {
    describe('DFS', () => {
        it.only("should find shortest path", () => {
            const graph = new Graph();
            graph.addDirectedEdge("u", "v", {weight: 1});
            graph.addDirectedEdge("u", "x", {weight: 1});
            graph.addDirectedEdge("v", "y", {weight: 1});
            graph.addDirectedEdge("v", "A", {weight: 1});
            graph.addDirectedEdge("w", "y", {weight: 1});
            graph.addDirectedEdge("w", "z", {weight: 1});
            graph.addDirectedEdge("x", "v", {weight: 1});
            graph.addDirectedEdge("y", "x", {weight: 1});
            graph.addDirectedEdge("y", "B", {weight: 1});
            graph.addDirectedEdge("z", "z", {weight: 1});
            graph.addVertex("A");
            graph.addVertex("B");
            const algorithm = algorithms[6];
            const apply_algorithm = new Algorithm(undefined as unknown as AlgorithmRepository).execute(algorithm.algorithm);
            const path = apply_algorithm(graph, "u", "A");
            expect(path).toEqual(['u', 'v', 'A']);
        });
    })
});
