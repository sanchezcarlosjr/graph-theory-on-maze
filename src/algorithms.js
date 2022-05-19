export const find_shortest_path_by_dijkstra = `function find_shortest_path_by_dijkstra(G, source_vertex) {
    const path = new Set();
    const queue = new Queue();
    while (!queue.isEmpty()) {
    }
    return path;
}`;

export function build_function(algorithm) {
    return new Function("G", "source_vertex", `return ${algorithm.toString()}(G, source_vertex)`);
}