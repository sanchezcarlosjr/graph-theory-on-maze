import {shaders} from "./shader";
import {GLObject, Uniform, VerticesAttribute} from "./GLObject";
import {mat4} from "gl-matrix";
import {createProgramInfo, resizeCanvasToDisplaySize} from "./webgl";
import {Coordinate, makeMaze, square} from "./program";
import {Movement} from "./movement";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function config(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function model(gl, n = 20, graph, source, goal, path) {
    const speed = 0.01;
    const coordinate = new Coordinate(n);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    path = path.map((vertex) => parseInt(vertex));
    const movement = new Movement(
        speed,
        path,
        n,
        coordinate.WIDTH / speed,
        graph,
        goal
    );
    const programsInfo = shaders.map((shader) => createProgramInfo(gl, [shader.vertex, shader.fragment]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return [new GLObject(programsInfo[0], gl, [new VerticesAttribute({
        gl, programInfo: programsInfo[0], name: "vertex", vertices: makeMaze(n, graph), numComponents: 2
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    })], [], gl.TRIANGLES), new GLObject(programsInfo[1], gl, [new VerticesAttribute({
        gl,
        programInfo: programsInfo[1],
        name: "vertex",
        vertices: square(coordinate.fromDiscreteToContinue(parseInt(source)), coordinate.WIDTH),
        numComponents: 2
    })], [new Uniform({
        gl,
        programInfo: programsInfo[1],
        name: "transformation",
        uniformSetter: "uniformMatrix4fv",
        values: [false, mat4.identity(mat4.create())],
        draw: (values) => [
            false,
            mat4.translate(
                mat4.create(),
                values[1],
                new Float32Array(movement.transits(values[1][12], values[1][13]))
            )
        ]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    })], gl.TRIANGLES), new GLObject(programsInfo[2], gl, [new VerticesAttribute({
        gl,
        programInfo: programsInfo[2],
        name: "vertex",
        vertices: square(coordinate.fromDiscreteToContinue(parseInt(goal)), coordinate.WIDTH),
        numComponents: 2
    })], [], gl.TRIANGLES)];
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function renderAnimation(gl, glObjects: GLObject[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function drawScene(time) {
        config(gl);
        time *= 0.05;
        glObjects.forEach((glObject) => {
            glObject.render(time);
        });
        requestAnimationFrame(drawScene);
    }

    requestAnimationFrame(drawScene);
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function renderImage(gl, glObjects: GLObject[]) {
    config(gl);
    glObjects.forEach((glObject) => {
        glObject.render();
    });
}