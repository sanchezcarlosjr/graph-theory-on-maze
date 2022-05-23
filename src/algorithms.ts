export const algorithms = [
    {
        id: 1,
        name: "Dijkstra",
        algorithm: `function find_shortest_path_by_dijkstra(G, source_vertex) {
    const path = new Set();
    const queue = new Queue();
    while (!queue.isEmpty()) {
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
];

export function build_function(algorithm) {
    return new Function("G", "source_vertex", `return ${algorithm.toString()}(G, source_vertex)`);
}