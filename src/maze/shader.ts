export const shaders = [
    {
        fragment: `
            precision mediump float;
            
            void main()
            {
                gl_FragColor = vec4(1,1,1,1);
            }
        `,
        vertex: `
            attribute vec4 vertex;
            
            void main() {
                gl_Position = vertex;
            }
        `
    },
    {
        fragment: `
            precision mediump float;
            
            void main()
            {
                gl_FragColor = vec4(0,0.5,0.5,1);
            }
        `,
        vertex: `
            attribute vec4 vertex;
            
            void main() {
                gl_Position = vertex;
            }
        `
    },
    {
        fragment: `
            precision mediump float;
            
            void main()
            {
                gl_FragColor = vec4(0,0,0.5,1);
            }
        `,
        vertex: `
            attribute vec4 vertex;
            
            void main() {
                gl_Position = vertex;
            }
        `
    }
];