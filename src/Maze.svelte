<script lang="ts">
    import { onMount } from "svelte";
    import {model, renderAnimation, renderImage} from "./webgl/render";
    let canvas;
    let gl;
    let render = async () => {
        if (!gl) {
            return;
        }
        const objects = await model(gl);
        await renderAnimation(gl, objects);
    }
    onMount(async () => {
        gl = canvas.getContext("webgl");
        if (!gl) {
            throw new Error("WebGL doesn't work.");
        }
        await render();
    });
</script>

<canvas  bind:this={canvas}></canvas>

<style>
    canvas {
        width: 60%;
        height: 89vh;
    }
</style>