<script lang="ts">
    import {Webgl} from './maze/webgl';
    import { onMount } from "svelte";
    import {fragmentShader, vertexShader} from "./maze/shader";
    import {Coordinate, makeMaze, square} from "./maze/program";
    import {makeAGraphMaze} from "./Graph";
    let canvas;
    onMount(() => {
        const webgl = new Webgl(canvas);
        const program = webgl.initShaderProgram(vertexShader, fragmentShader);
        const n = 4;
        let [graph, source, goal] = makeAGraphMaze(n);
        const maze = {
            program,
            bufferInfo: {
                numElements: 0
            },
            initBuffers:function initMazeBuffer(obj) {
                const vertices = makeMaze(n, graph);
                {
                    const buffer = this.gl.createBuffer();
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
                    const coordinate = this.gl.getAttribLocation(obj.program, "coordinate");
                    this.gl.vertexAttribPointer(coordinate, 2, this.gl.FLOAT, false, 0, 0);
                    this.gl.enableVertexAttribArray(coordinate);
                }
                {
                    // @ts-ignore
                    const colors = vertices.map(() => [1, 1, 1]).flat();
                    const buffer = this.gl.createBuffer();
                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
                    const colorAttribute = this.gl.getAttribLocation(obj.program, "color");
                    this.gl.vertexAttribPointer(colorAttribute, 3, this.gl.FLOAT, true, 0, 0);
                    this.gl.enableVertexAttribArray(colorAttribute);
                }
                obj.bufferInfo.numElements = vertices.length;
            },
            draw: function (obj: {bufferInfo}) {
                this.gl.drawArrays( this.gl.TRIANGLES, 0, obj.bufferInfo.numElements );
            }
        };
        const b  = {

        }
        webgl.objectsToDraw = [
            maze
        ];
        webgl.drawScene();
    });
</script>

<canvas  bind:this={canvas}></canvas>

<style>
    canvas {
        width: 50%;
        height: 89vh;
    }
</style>