import {shaders} from "../maze/shader";
import {GLObject, Uniform, VerticesAttribute} from "./GLObject";
import {mat4} from "gl-matrix";
import {createProgramInfo, resizeCanvasToDisplaySize} from "./webgl";
import {Coordinate, makeMaze, square} from "../maze/program";

export function config(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export async function model(gl, n = 20, graph, source, goal, path) {
    const speed = 0.01;
    const coordinate = new Coordinate(n);
    path = path.map((x) => x.toString());
    const frames = coordinate.WIDTH / speed;
    let actualVertex = 1;
    const drawPath = (values) => {
        if (actualVertex >= path.length || path[actualVertex] === goal) {
            return [false, mat4.translate(mat4.create(), values[1], [0, 0, 0])];
        }
        const diffX = Math.round(Math.abs(values[1][12]) * 100);
        if (+path[actualVertex] + 1 === +path[actualVertex - 1] && (diffX === 0 || diffX % frames !== 0)) {
            return [false, mat4.translate(mat4.create(), values[1], [-speed, 0, 0])];
        }
        if (+path[actualVertex] - 1 === +path[actualVertex - 1] && (diffX === 0 || diffX % frames !== 0)) {
            return [false, mat4.translate(mat4.create(), values[1], [speed, 0, 0])];
        }
        const diffY = Math.round(Math.abs(values[1][13]) * 100);
        if (+path[actualVertex] + n === +path[actualVertex - 1] && (diffY === 0 || diffY % frames !== 0)) {
            return [false, mat4.translate(mat4.create(), values[1], [0, speed, 0])];
        }
        if (+path[actualVertex] - n === +path[actualVertex - 1] && (diffY === 0 || diffY % frames !== 0)) {
            return [false, mat4.translate(mat4.create(), values[1], [0, -speed, 0])];
        }
        actualVertex++;
        if (+path[actualVertex] - 1 === +path[actualVertex - 1]) {
            return [false, mat4.translate(mat4.create(), values[1], [speed, 0, 0])];
        }
        if (+path[actualVertex] - 1 === +path[actualVertex - 1]) {
            return [false, mat4.translate(mat4.create(), values[1], [speed, 0, 0])];
        }
        if (+path[actualVertex] + n === +path[actualVertex - 1]) {
            return [false, mat4.translate(mat4.create(), values[1], [0, speed, 0])];
        }
        if (+path[actualVertex] - n === +path[actualVertex - 1]) {
            return [false, mat4.translate(mat4.create(), values[1], [0, -speed, 0])];
        }
        return [false, mat4.translate(mat4.create(), values[1], [0, 0, 0])];
    };
    const programsInfo = shaders.map((shader) => createProgramInfo(gl, [shader.vertex, shader.fragment]));
    return [
        new GLObject(
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
        ),
        new GLObject(
            programsInfo[1],
            gl,
            [
                new VerticesAttribute({
                    gl,
                    programInfo: programsInfo[1],
                    name: "vertex",
                    vertices: square(coordinate.fromDiscreteToContinue(source), coordinate.WIDTH),
                    numComponents: 2
                })
            ],
            [
                new Uniform({
                    gl,
                    programInfo: programsInfo[1],
                    name: "transformation",
                    uniformSetter: "uniformMatrix4fv",
                    values: [
                        false,
                        mat4.identity(mat4.create())
                    ],
                    draw: drawPath
                })
            ],
            gl.TRIANGLES
        ), new GLObject(
            programsInfo[2],
            gl,
            [
                new VerticesAttribute({
                    gl,
                    programInfo: programsInfo[2],
                    name: "vertex",
                    vertices: square(coordinate.fromDiscreteToContinue(goal), coordinate.WIDTH),
                    numComponents: 2
                })
            ],
            [],
            gl.TRIANGLES
        )
    ];
}

export async function renderAnimation(gl, glObjects: GLObject[]) {
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

export async function renderImage(gl, glObjects: GLObject[]) {
    config(gl);
    glObjects.forEach((glObject) => {
        glObject.render();
    });
}