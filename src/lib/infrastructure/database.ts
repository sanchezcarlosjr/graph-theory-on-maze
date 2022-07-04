import type {Algorithm} from "../domain/algorithm";

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
        algorithm: `function find_shortest_path_by_breadth_first_search(graph, source, goal) {
    graph.initialize_single_source(source);
    const queue = new QueueRecorder();
    queue.enqueue(source);
    while(!queue.isEmpty) {
        const u = queue.dequeue();
        if (u === goal) {
            return graph.reconstruct_path(goal);
        }
        for (const [neighbor] of graph.getAdjacent(u)) {
             if (graph.isWall(neighbor)) {
                 continue;
             }
             const neighborWasRecorded = queue.enqueue(neighbor);
             if (neighborWasRecorded) {
                 graph.relax(u, neighbor);
             }
        }
    }
    return [];
}`
    },
    {
        id: 4,
        name: 'Linear programming',
        algorithm: `function find_shortest_path_by_linear_programming(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
    },
    {
        id: 5,
        name: 'Bellman-Ford',
        algorithm: `function find_shortest_path_by_bellman_ford(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
    },
    {
        id: 6,
        name: 'Deep first search',
        algorithm: `function find_shortest_path_by_deep_first_search(graph, source, goal) {
        // Introduction to algorithms 20.3 Deep first search 4th edition
        graph.initialize_single_source(source);
        const stack = [];
        const records = new Set();
        let current_vertex = source;
        while (true) {
            do {
                while (
                     current_vertex !== undefined && 
                     !records.has(current_vertex) &&
                     graph.vertex(current_vertex).cost < Infinity
                    ) {
                    stack.push(current_vertex);
                    records.add(current_vertex);
                    if (stack.length >= 2) {
                        graph.relax(stack[stack.length-2], stack[stack.length-1]);
                    }
                    if (current_vertex === goal) {
                        return graph.reconstruct_path(goal);
                    }
                    current_vertex = graph.exploreNeighbor(current_vertex);
                }
            } while ((current_vertex = graph.exploreNeighbor(stack[stack.length - 1])) !== undefined);
            stack.pop();
            if (stack.length === 0) {
                return [];
            }
            current_vertex = graph.exploreNeighbor(stack[stack.length - 1]);
        }
        return [];
} 
        `
    },
    {
        id: 7,
        name: 'Genetic algorithm',
        algorithm: `function find_shortest_path_by_genetic_algorithm(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
    },
    {
        id: 8,
        name: 'DAG',
        algorithm: `function find_shortest_path_by_dag(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
    },
    {
        id: 9,
        name: 'Manual',
        algorithm: `function find_shortest_path_by_user(graph, source, goal) {
       const path = [
        source, 
        source+=20,
        source+=20,
        source+=1,
        source+=20,
    ];
    return graph.reconstruct_path(goal);
}`
    },
    {
        id: 10,
        name: 'Euler tour traversal (aka pre-order traversal)',
        algorithm: `function find_shortest_path_by_dag(graph, source, goal) {
    return graph.reconstruct_path(goal);
}`
    }
];