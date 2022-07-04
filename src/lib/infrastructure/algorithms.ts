import {browser} from '$app/env';
import type {Algorithm, AlgorithmRepository} from '../domain/algorithm';
import {algorithms} from "./database";

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
