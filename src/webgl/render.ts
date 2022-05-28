import {shaders} from "../maze/shader";
import {GLObject, VerticesAttribute} from "./GLObject";
import {createProgramInfo, resizeCanvasToDisplaySize} from "./webgl";
import {makeAGraphMaze} from "../Graph";
import {makeMaze} from "../maze/program";

export function config(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export async function model(gl) {
    const n = 50;
    let [graph, source, goal] = makeAGraphMaze(n);
    const programsInfo = shaders.map((shader) => createProgramInfo(gl, [shader.vertex, shader.fragment]));
    const maze = new GLObject(
        programsInfo[0],
        gl,
        [
            new VerticesAttribute({
                gl,
                programInfo: programsInfo[0],
                name: "vertex",
                vertices: makeMaze(n, graph),
                numComponents: 2
            })
        ],
        [],
        gl.TRIANGLES
    );
    return [maze];
}

export async function renderAnimation(gl, glObjects: GLObject[]) {
    function drawScene(time) {
        config(gl);
        time *= 0.005;
        glObjects.forEach((glObject) => {
            glObject.render(time);
        });
        requestAnimationFrame(drawScene);
    }

    requestAnimationFrame(drawScene);
}

export async function renderImage(gl, glObjects: GLObject[]) {
    config(gl);
    glObjects.forEach((glObject) => {
        glObject.render();
    });
}