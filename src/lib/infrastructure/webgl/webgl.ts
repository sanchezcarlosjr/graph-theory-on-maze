// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function resizeCanvasToDisplaySize(canvas, multiplier = 1) {
	const width = (canvas.clientWidth * multiplier) | 0;
	const height = (canvas.clientHeight * multiplier) | 0;
	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		return true;
	}
	return false;
}

export const loadImage = (src: string): Promise<HTMLImageElement> =>
	new Promise((resolve) => {
		const image = new Image();
		image.src = src;
		image.onload = function () {
			resolve(image);
		};
	});

export function createProgramInfo(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	gl,
	shaderSources,
	opt_attribs?,
	opt_locations?
) {
	const program = createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations);
	if (!program) {
		throw new Error('Shader is null');
	}
	return {
		program
	};
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function loadShader(gl, shaderSource, shaderType) {
	// Create the shader object
	const shader = gl.createShader(shaderType);

	// Load the shader source
	gl.shaderSource(shader, shaderSource);

	// Compile the shader
	gl.compileShader(shader);

	// Check the compile status
	const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
		// Something went wrong during compilation; get the error
		const lastError = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		throw new Error(
			"*** Error compiling shader '" +
				shader +
				"':" +
				lastError +
				`\n` +
				shaderSource
					.split('\n')
					.map((l, i) => `${i + 1}: ${l}`)
					.join('\n')
		);
	}

	return shader;
}

const defaultShaderType = ['VERTEX_SHADER', 'FRAGMENT_SHADER'];

function createProgramFromSources(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	gl,
	shaderSources,
	opt_attribs,
	opt_locations
) {
	const shaders = [];
	for (let ii = 0; ii < shaderSources.length; ++ii) {
		shaders.push(loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]]));
	}
	return createProgram(gl, shaders, opt_attribs, opt_locations);
}

function createProgram(
	gl: WebGLRenderingContext,
	shaders: WebGLShader[],
	opt_attribs: string[],
	opt_locations: number[]
) {
	const program = gl.createProgram();
	shaders.forEach(function (shader) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		gl.attachShader(program, shader);
	});
	if (opt_attribs) {
		opt_attribs.forEach(function (attrib, ndx) {
			gl.bindAttribLocation(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				program,
				opt_locations ? opt_locations[ndx] : ndx,
				attrib
			);
		});
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	gl.linkProgram(program);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const lastError = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error('Error in program linking:' + lastError);
	}
	return program;
}
