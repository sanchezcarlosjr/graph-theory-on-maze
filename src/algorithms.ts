export const algorithms = [
    {
        id: 1,
        name: "Dijkstra",
        algorithm: `function find_shortest_path_by_dijkstra(G, source_vertex) {
    const path = [];
    const queue = new PriorityQueue();
    queue.insert(G.vertices);
    while (!queue.isEmpty) {
         const u = queue.extractPeek();
         path.push(u);
         for(const vertex of G.adj(u)) {
              const relaxHasDecreased = G.relax(u,v);
              if (relaxHasDecreased) {
                 queue.decreaseKey();
              }
         }
    }
    return path;
}` },
    {
        id: 2,
        name: "A star",
        algorithm: `function find_shortest_path_by_A_star(G, source_vertex) {
    return path;
}` },
    {
        id: 3,
        name: "Breadth first search",
        algorithm: `function find_shortest_path_by_breadth_first_search(G, source_vertex) {
    return path;
}` },
    {
        id: 4,
        name: "Linear programming",
        algorithm: `function find_shortest_path_by_linear_programming(G, source_vertex) {
    return path;
}` },
    {
        id: 5,
        name: "Bellman-Ford",
        algorithm: `function find_shortest_path_by_bellman_ford(G, source_vertex) {
    return path;
}` },
    {
        id: 6,
        name: "Deep first search",
        algorithm: `function find_shortest_path_by_deep_first_search(G, source_vertex) {
    return path;
}` },
    {
        id: 7,
        name: "Genetic algorithm",
        algorithm: `function find_shortest_path_by_genetic_algorithm(G, source_vertex) {
    return path;
}` },
];

export function build_function(algorithm) {
    return new Function("G", "source_vertex", `return ${algorithm}(G, source_vertex)`);
}