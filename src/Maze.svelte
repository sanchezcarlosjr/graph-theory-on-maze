<script lang="ts">
    import {makeAGraphMaze} from "./Graph";
    import {Webgl} from './maze/webgl';
    import { onMount } from "svelte";
    import {fragmentShader, vertexShader} from "./maze/shader";
    import {drawScene, initBuffers} from "./maze/program";
    let canvas;
    onMount(() => {
        const webgl = new Webgl(canvas);
        webgl.initShaderProgram(vertexShader, fragmentShader);
        webgl.initBuffers(initBuffers);
        webgl.drawScene(drawScene);
    });
</script>

<canvas  bind:this={canvas}></canvas>

<style>
    canvas {
        width: 50%;
        height: 89vh;
    }
</style>