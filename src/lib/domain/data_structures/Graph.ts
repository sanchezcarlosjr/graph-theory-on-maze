export interface Vertex {
	adjacent: Map<string, { [key: string]: string | number | boolean }>;

	[key: string]:
		| string
		| number
		| boolean
		| Map<string, { [key: string]: string | number | boolean }>;
}

export class Graph {
	constructor(private graph = new Map<string, Vertex>()) {
	}
	get vertices() {
		return this.graph.values();
	}

	get countVertices() {
		return this.graph.size;
	}

	addDirectedEdge(
		vertexA: string,
		vertexB: string,
		attributes?: { [key: string]: string | number | boolean }
	) {
		if (!this.graph.has(vertexA)) {
			return this.graph.set(vertexA, {
				adjacent: new Map<string, { [key: string]: string | number | boolean }>([
					[
						vertexB,
						{
							...attributes
						}
					]
				]),
				name: vertexA
			});
		}
		this.graph.get(vertexA)?.adjacent.set(vertexB, {
			...attributes
		});
	}

	addNoDirectedEdge(
		vertexA: string,
		vertexB: string,
		attributes?: { [key: string]: string | number | boolean }
	) {
		this.addDirectedEdge(vertexA, vertexB, attributes);
		this.addDirectedEdge(vertexB, vertexA, attributes);
	}

	edge(vertexA: string, vertexB: string) {
		if (!this.graph.has(vertexA) || !this.graph.has(vertexB)) {
			return;
		}
		return this.graph.get(vertexA)?.adjacent.get(vertexB);
	}

	vertex(vertex: string) {
		vertex = vertex.toString();
		if (!this.graph.has(vertex)) {
			throw new Error(`${vertex} is not in graph`);
		}
		return this.graph.get(vertex);
	}

	reconstruct_path(goal: string) {
		let path: string[] = [];
		let actualVertex = goal;
		while (actualVertex !== undefined) {
			path.push(actualVertex);
			actualVertex = this.vertex(actualVertex)?.predecessor as string;
		}
		return path.reverse();
	}

	clean() {
		for (const vertex of this.vertices) {
			 delete vertex['predecessor'];
			 delete vertex['distance'];
		}
		this.iterators = {};
	}

	hasEdge(vertexA: string, vertexB: string) {
		return (
			this.graph.has(vertexA) &&
			this.graph.has(vertexB) &&
			this.graph.get(vertexA)?.adjacent.has(vertexB)
		);
	}

	weight(vertexA: string, vertexB: string): number {
		return (this.edge(vertexA, vertexB)?.weight as number) ?? Infinity;
	}

	isAdjacent(vertexA: string, vertexB: string) {
		return this.graph.has(vertexA) && this.graph.get(vertexA)?.adjacent.has(vertexB);
	}

	hasVertex(vertex: string) {
		return this.graph.has(vertex);
	}

	relax(u: string, v: string) {
		const newDistance =
			((this.vertex(v)?.cost as number) ?? 0)  + ((this.vertex(u)?.distance as number) ?? 0) + this.weight(u, v);
		if (newDistance === Infinity) {
			return false;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (this.vertex(v).distance > newDistance) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.vertex(v).distance = newDistance;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.vertex(v).predecessor = u;
			return true;
		}
		return false;
	}

	initialize_single_source(source: string, key = 'distance') {
		for (const vertex of this.vertices) {
			vertex[key] = Infinity;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.vertex(source)[key] = 0;
	}

	getAdjacent(vertex: string) {
		return this.graph.get(vertex)?.adjacent;
	}

	private iterators: {[vertex: string]: IterableIterator<[string, Vertex]>} = {};
	exploreNeighbor(current_vertex: string): string|undefined {
		if (!Object.hasOwn(this.iterators, current_vertex)) {
			 this.iterators[current_vertex] = (this.getAdjacent(current_vertex) as Map<string, Vertex>)[Symbol.iterator]();
		}
		const neighbor = this.iterators[current_vertex].next();
		return neighbor.done ? undefined : neighbor.value[0];
	}

	addVertex(vertex: string) {
		this.graph.set(vertex, {
			adjacent: new Map<string, { [key: string]: string | number | boolean }>(),
			name: vertex
		});
	}
}
