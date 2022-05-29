import {shaders} from "../maze/shader";
import {GLObject, Uniform, VerticesAttribute} from "./GLObject";
import {mat4, vec3} from "gl-matrix";
import {createProgramInfo, resizeCanvasToDisplaySize} from "./webgl";
import {makeAGraphMaze} from "../Graph";
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

export async function model(gl) {
    const n = 20;
    let [graph, source, goal] = makeAGraphMaze(n);
    const coordinate = new Coordinate(n);
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
                      values: [false,
                          mat4.translate(
                              mat4.create(),
                              mat4.scale(mat4.create(), mat4.identity(mat4.create()), [0.5,0.5,0]),
                              [0,0,0]
                          )
                      ],
                      draw: (values, time) => {
                          return [false, mat4.translate(mat4.create(), values[1], [-0.01, 0, 0])];
                      }
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