import type { AlgorithmRepository } from '../domain/algorithm';

export class Algorithm {
	constructor(private repository: AlgorithmRepository) {}
	loadDefault(): number {
		return this.repository.load();
	}

	loadAlgorithms() {
		return this.repository.loadAll();
	}
	execute(algorithm: string) {
		return new Function('G', 'source', 'goal', `
		             G.clean();
		             return ${algorithm}(G, source, goal);
		`);
	}

	save(algorithmCode: string) {
		if (algorithmCode !== '') {
			this.repository.save(algorithmCode);
		}
	}
}
