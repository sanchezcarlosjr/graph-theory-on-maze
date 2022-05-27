export const vertexShader = `
attribute vec4 coordinate;
attribute vec4 color;
varying vec4 v_Color;

void main()
{
    gl_Position = coordinate;
    v_Color = color;
}
`;

export const fragmentShader = `
precision mediump float;
varying vec4 v_Color;

void main()
{
    gl_FragColor = v_Color;
}
`;