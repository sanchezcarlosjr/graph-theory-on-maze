import type { Graph } from '$lib/domain/data_structures/Graph';

export enum STATE {
	STOP,
	MOVE_UP,
	MOVE_RIGHT,
	MOVE_DOWN,
	MOVE_LEFT
}

export class Movement {
	private vertex = 0;
	private currentState: STATE = STATE.STOP;
	private states = [
		{
			RESPONSE: [0, 0, 0],
			transits: () => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (
					this.vertex >= this.path.length ||
					(this.vertex + 1 < this.path.length &&
						this.graph.vertex(this.path[this.vertex + 1].toString()).cost === Infinity) ||
					this.path[this.vertex].toString() === this.goal
				) {
					return STATE.STOP;
				}
				if (+this.path[this.vertex] === +this.path[this.vertex + 1] + this.n) {
					return STATE.MOVE_UP;
				}
				if (+this.path[this.vertex] === +this.path[this.vertex + 1] + 1) {
					return STATE.MOVE_RIGHT;
				}
				if (+this.path[this.vertex] === +this.path[this.vertex + 1] - this.n) {
					return STATE.MOVE_DOWN;
				}
				if (+this.path[this.vertex] === +this.path[this.vertex + 1] - 1) {
					return STATE.MOVE_LEFT;
				}
				return STATE.STOP;
			}
		},
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			RESPONSE: [0, this.speed, 0],
			transits: (_, y) => {
				const diff = Math.round(Math.abs(y) * 100);
				if (diff % this.frame !== 0) {
					return STATE.MOVE_UP;
				}
				this.vertex++;
				return STATE.STOP;
			}
		},
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			RESPONSE: [-this.speed, 0, 0],
			transits: (x) => {
				const diff = Math.round(Math.abs(x) * 100);
				if (diff % this.frame !== 0) {
					return STATE.MOVE_RIGHT;
				}
				this.vertex++;
				return STATE.STOP;
			}
		},
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			RESPONSE: [0, -this.speed, 0],
			transits: (_, y) => {
				const diff = Math.round(Math.abs(y) * 100);
				if (diff % this.frame !== 0) {
					return STATE.MOVE_DOWN;
				}
				this.vertex++;
				return STATE.STOP;
			}
		},
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			RESPONSE: [this.speed, 0, 0],
			transits: (x) => {
				const diff = Math.round(Math.abs(x) * 100);
				if (diff % this.frame !== 0) {
					return STATE.MOVE_LEFT;
				}
				this.vertex++;
				return STATE.STOP;
			}
		}
	];

	constructor(
		private speed: number,
		private path: any[],
		private n: number,
		private frame: number,
		private graph: Graph,
		private goal: string
	) {}

	transits(x: number, y: number) {
		this.currentState = this.states[this.currentState].transits(x, y);
		return this.states[this.currentState].RESPONSE;
	}
}
