import {algorithms} from "../src/algorithms";
import {Queue} from "../src/Queue";

global.Queue = Queue;

it('it should load queue', async () => {
    const algorithm = algorithms[0].algorithm;
    const f = new Function("G", "x", `return ${algorithm}(G, x)`);
    expect(() => f("g", "G")).not.toThrowError('ReferenceError: Queue is not defined');
});