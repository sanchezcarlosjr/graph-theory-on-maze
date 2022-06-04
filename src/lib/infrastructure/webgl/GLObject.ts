interface AttributeProperties {
    gl: WebGLRenderingContext;
    programInfo: any;
    name: string;
    numComponents?: number;
    type?: number;
    normalize?: boolean;
    stride?: number;
    offset?: number;
}

interface PositionAttributeProperties extends AttributeProperties {
    numVertices?: number;
}

interface VerticesAttributeProperties extends AttributeProperties {
    vertices?: number[];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    draw?: (values, time) => any[]
}

interface TextureAttributeProperties extends AttributeProperties {
    image?: HTMLImageElement;
}

abstract class GLAttribute<T extends AttributeProperties> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly buffer: WebGLBuffer = undefined;

    protected constructor(protected properties: T) {
        this.properties = {
            type: this.properties.gl.FLOAT, normalize: false, stride: 0, offset: 0, ...this.properties
        };
        this.buffer = this.create();
    }

    get gl() {
        return this.properties.gl;
    }

    set gl(gl) {
        this.properties.gl = gl;
    }

    get programInfo() {
        return this.properties.programInfo;
    }


    set programInfo(programInfo) {
        this.properties.programInfo = programInfo;
    }

    get name() {
        return this.properties.name;
    }

    get numComponents() {
        return this.properties.numComponents;
    }

    get type() {
        return this.properties.type;
    }

    get normalize() {
        return this.properties.normalize;
    }

    get stride() {
        return this.properties.stride;
    }

    get offset() {
        return this.properties.offset;
    }

    draw() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        const vertexId = this.gl.getAttribLocation(this.programInfo.program, this.name);
        this.gl.enableVertexAttribArray(vertexId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.gl.vertexAttribPointer(vertexId, this.numComponents, this.type, this.normalize, this.stride, this.offset);
    }

    protected abstract create(): WebGLBuffer;

}

export class PositionAttribute extends GLAttribute<PositionAttributeProperties> {
    protected _numberElements = 0;
    constructor(props: PositionAttributeProperties) {
        props.numVertices = props.numVertices ?? 4;
        props.numComponents = 1;
        super(props);
        this._numberElements = props.numVertices / props.numComponents;
    }

    get numElements() {
        return this._numberElements;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    create() {
        const idBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, idBuffer);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const vertexIds = new Float32Array(this.properties.numVertices);
        vertexIds.forEach((v, i) => {
            vertexIds[i] = i;
        });
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexIds, this.gl.STATIC_DRAW);
        return idBuffer;
    }
}

export class VerticesAttribute extends GLAttribute<VerticesAttributeProperties> {
    protected _numberElements = 0;
    constructor(props: VerticesAttributeProperties) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const draw = (values) => values;
        props.draw = props.draw ?? draw;
        super(props);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._numberElements = props.vertices.length / props.numComponents;
    }
    get numElements() {
        return this._numberElements;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    create() {
        const idBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, idBuffer);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const vertices = new Float32Array(this.properties.vertices);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        return idBuffer;
    }
}

export class TextureAttribute extends GLAttribute<TextureAttributeProperties> {
    constructor(props: TextureAttributeProperties) {
        super(props);
        this.properties.numComponents = 2;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    protected create() {
        const texcoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0,
        ]), this.gl.STATIC_DRAW);

        // Create a texture.
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        // Upload the image into the texture.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.properties.image);

        return texcoordBuffer;
    }
}

export class Uniform {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly uniform: WebGLUniformLocation = undefined;
    constructor(
        private props: {
            gl: WebGLRenderingContext,
            programInfo: any,
            name: string,
            uniformSetter: string,
            values: any[],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draw?: (values, time) => any[]
        }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const draw = (values) => values;
        this.props.draw = this.props.draw ?? draw;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.uniform = this.create();
    }
    create() {
        return this.props.gl.getUniformLocation(this.props.programInfo.program, this.props.name);
    }
    draw(time=0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.props.values = this.props.draw(this.props.values, time);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.props.gl[this.props.uniformSetter](this.uniform, ...this.props.values);
    }
}

export class GLObject {
    protected positionAttribute: PositionAttribute;
    constructor(
                protected programInfo: any, protected gl: WebGLRenderingContext,
                protected attributes: GLAttribute<AttributeProperties>[] = [],
                protected uniforms: Uniform[] = [],
                protected type = undefined
                ) {
        this.positionAttribute = attributes[0] as PositionAttribute;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.type = this.type ?? this.gl.TRIANGLE_FAN;
    }

    private draw(time=0) {
        this.attributes.forEach((attribute) => attribute.draw());
        this.uniforms.forEach((uniform) => uniform.draw(time));
    }

    render(time=0) {
        this.gl.useProgram(this.programInfo.program);
        this.draw(time);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.gl.drawArrays(this.type, 0, this.positionAttribute.numElements);
    }
}