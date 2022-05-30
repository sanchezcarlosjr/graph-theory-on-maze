import {algorithms} from "../src/algorithms";
import {PriorityQueue} from "../src/data_structures/PriorityQueue";

global.PriorityQueue = PriorityQueue;

it('it should load queue', async () => {
    const algorithm = algorithms[0].algorithm;
    const f = new Function("G", "x", `return ${algorithm}(G, x)`);
    expect(() => f("g", "G")).not.toThrowError('ReferenceError: PriorityQueue is not defined');
});