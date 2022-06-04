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
                gl_FragColor = vec4(255,0,0,0.6);
            }
        `,
		vertex: `
            attribute vec4 vertex;
            uniform mat4 transformation;
            
            void main() {
                gl_Position = transformation*vertex;
            }
        `
	},
	{
		fragment: `
            precision mediump float;
            
            void main()
            {
                gl_FragColor = vec4(255,215,0,1);
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
