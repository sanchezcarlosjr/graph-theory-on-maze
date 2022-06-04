export interface Algorithm {
	id: number;
	name: string;
	algorithm: string;
}

export interface AlgorithmRepository {
	save(algorithmCode: string): void;
	load: () => number;
	loadAll: () => Algorithm[];
}
