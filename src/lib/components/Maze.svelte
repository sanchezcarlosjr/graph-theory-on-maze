<script lang="ts">
	import { onMount } from 'svelte';
	import { model, renderAnimation } from '$lib/infrastructure/webgl/render';
	import { makeAMaze } from '$lib/domain/MakeAMaze';
	let canvas;
	let gl;
	export let n = 20;
	export let graph = undefined;
	export let source: string;
	export let goal: string;
	export let path = [];
    [graph, source, goal] = makeAMaze(n);
	let renderNewPath = async (newPath) => {
		if (!gl) {
			return;
		}
		const objects = await model(gl, n, graph, source, goal, newPath);
		await renderAnimation(gl, objects);
	};
    let renderGraph = async (size) => {
        if (!gl) {
            return;
        }
        [graph, source, goal] = makeAMaze(n);
        const objects = await model(gl, size, graph, source, goal, []);
        await renderAnimation(gl, objects);
    };
	onMount(async () => {
		gl = canvas.getContext('webgl');
		if (!gl) {
			throw new Error("WebGL doesn't work.");
		}
	});
	$: renderNewPath(path);
    $: renderGraph(n);
</script>

<canvas bind:this={canvas}>Graph Maze Visualizer</canvas>

<style>
	canvas {
		width: var(--width, 100%);
		height: var(--height, 80vh);
	}
</style>
