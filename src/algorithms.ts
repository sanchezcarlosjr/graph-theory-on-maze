export const algorithms = [
    {
        id: 1,
        name: "Dijkstra",
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
        for (const u of graph.getAdjacent(vertex)) {
            const relaxHasDecreased = graph.relax(vertex, u[0]);
            if (relaxHasDecreased) {
                queue.changeKey(u[0], graph.vertex(u[0]).distance);
            }
        }
    }
    return [];
}` },
    {
        id: 2,
        name: "A star",
        algorithm: `function find_shortest_path_by_A_star(G, source, goal) {
    return path;
}` },
    {
        id: 3,
        name: "Breadth first search",
        algorithm: `function find_shortest_path_by_breadth_first_search(G, source, goal) {
    return path;
}` },
    {
        id: 4,
        name: "Linear programming",
        algorithm: `function find_shortest_path_by_linear_programming(G, source, goal) {
    return path;
}` },
    {
        id: 5,
        name: "Bellman-Ford",
        algorithm: `function find_shortest_path_by_bellman_ford(G, source, goal) {
    return path;
}` },
    {
        id: 6,
        name: "Deep first search",
        algorithm: `function find_shortest_path_by_deep_first_search(G, source, goal) {
    return path;
}` },
    {
        id: 7,
        name: "Genetic algorithm",
        algorithm: `function find_shortest_path_by_genetic_algorithm(G, source, goal) {
    return path;
}` },
    {
        id: 8,
        name: "DAG-SHORTEST-PATHS",
        algorithm: `function find_shortest_path_by_dag(G, source, goal) {
    return path;
}`
    },
    {
        id: 9,
        name: "Manual",
        algorithm: `function find_shortest_path_by_user(G, source, goal) {
       const path = [
        source, 
        source+=20,
        source+=20,
        source+=1,
        source+=20,
    ];
    return path;
}`
    }
];

export function build_function(algorithm) {
    return new Function("G", "source",  "goal", `return ${algorithm}(G, +source, goal)`);
}