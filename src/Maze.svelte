<script lang="ts">
    import { onMount } from "svelte";
    import {model, renderAnimation} from "./webgl/render";
    import {makeAGraphMaze} from "./data_structures/Graph";
    let canvas;
    let gl;
    let n = 20;
    export let graph = undefined;
    export let source = "";
    export let goal = "";
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

<canvas  bind:this={canvas}></canvas>

<style>
    canvas {
        width: 60%;
        height: 89vh;
    }
</style>