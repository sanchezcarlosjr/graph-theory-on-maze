import { browser } from '$app/env';
import type { Algorithm } from '../domain/algorithm';
import type { AlgorithmRepository } from '../domain/algorithm';

export const algorithms: Algorithm[] = [
	{
		id: 0,
		name: 'User',
		algorithm: `function find_shortest_path_by_me(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 1,
		name: 'Dijkstra',
		algorithm: `function find_shortest_path_by_dijkstra(graph, source, goal) {
    const queue = new PriorityQueue();
    graph.initialize_single_source(source);
    for(const vertex of graph.vertices) {
        if(vertex.cost !== Infinity) {
            queue.insert(vertex.name, vertex.distance);
        }
    }
    while (!queue.isEmpty) {
        const vertex = queue.extractPeek();
        if (vertex === goal) {
          return graph.reconstruct_path(goal);
        }
        for (const [neighbor] of graph.getAdjacent(vertex)) {
            const relaxHasDecreased = graph.relax(vertex, neighbor);
            if (relaxHasDecreased) {
                queue.replace(neighbor, graph.vertex(neighbor).distance);
            }
        }
    }
    return [];
}`
	},
	{
		id: 2,
		name: 'A star',
		algorithm: `function find_shortest_path_by_A_star(graph, source, goal) {
    const h = (...vectors) => 
      Math.abs(vectors[0][0]-vectors[1][0])+
      Math.abs(vectors[0][1]-vectors[1][1])
    ;
    const f = (u,v) =>  graph.vertex(u).distance+h(
           graph.toEuclidean(u), graph.toEuclidean(v)
        );
    graph.initialize_single_source(source, "distance");
    const queue = new PriorityQueue();
    queue.insert(source, f(source, goal));
    while (!queue.isEmpty) {
        const vertex = queue.extractPeek();
        if (vertex === goal) {
          return graph.reconstruct_path(goal);
        }
        for (const [neighbor] of graph.getAdjacent(vertex)) {
            const relaxHasDecreased = graph.relax(vertex, neighbor);
            if (relaxHasDecreased) {
                queue.insert(neighbor, f(neighbor, goal));
            }
        }
    }
    return [];
}`
	},
	{
		id: 3,
		name: 'Breadth first search',
		algorithm: `function find_shortest_path_by_breadth_first_search(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 4,
		name: 'Linear programming',
		algorithm: `function find_shortest_path_by_linear_programming(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 5,
		name: 'Bellman-Ford',
		algorithm: `function find_shortest_path_by_bellman_ford(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 6,
		name: 'Deep first search',
		algorithm: `function find_shortest_path_by_deep_first_search(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 7,
		name: 'Genetic algorithm',
		algorithm: `function find_shortest_path_by_genetic_algorithm(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 8,
		name: 'DAG-SHORTEST-PATHS',
		algorithm: `function find_shortest_path_by_dag(G, source, goal) {
    return graph.reconstruct_path(goal);
}`
	},
	{
		id: 9,
		name: 'Manual',
		algorithm: `function find_shortest_path_by_user(G, source, goal) {
       const path = [
        source, 
        source+=20,
        source+=20,
        source+=1,
        source+=20,
    ];
    return graph.reconstruct_path(goal);
}`
	}
];

export class LocalStorageRepository implements AlgorithmRepository {
	load() {
		if (browser) {
			algorithms[0].algorithm = localStorage.getItem('algorithm') ?? algorithms[0].algorithm;
		}
		return 0;
	}

	loadAll(): Algorithm[] {
		return algorithms;
	}

	save(algorithmCode: string): void {
		if (browser) {
			localStorage.setItem('algorithm', algorithmCode);
		}
	}
}
