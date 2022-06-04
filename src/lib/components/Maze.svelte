<script lang="ts">
    import { onMount } from "svelte";
    import {makeAGraphMaze} from "$lib/domain/data_structures/Graph";
    import {model, renderAnimation} from "$lib/infrastructure/webgl/render";
    let canvas;
    let gl;
    let n = 20;
    export let graph = undefined;
    export let source: string;
    export let goal: string;
    export let path = [];
    [graph, source, goal] = makeAGraphMaze(n);
    let render = async (newPath) => {
        if (!gl) {
            return;
        }
        const objects = await model(gl, n, graph, source, goal, newPath);
        await renderAnimation(gl, objects);
    }
    onMount(async () => {
        gl = canvas.getContext("webgl");
        if (!gl) {
            throw new Error("WebGL doesn't work.");
        }
    });
    $: render(path);
</script>

<canvas bind:this={canvas}>Graph Maze Visualizer</canvas>

<style>
    canvas {
        width: var(--width, 100%);
        height: var(--height, 80vh);
    }
</style>