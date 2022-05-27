export class Webgl {
    gl = null;
    programInfo = {
        program: undefined
    };
    buffers = {};
    configureWebGl = () => {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0); 
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.setDefaultViewport();
    };
    constructor(canvas, configureWebGl=undefined) {
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
          throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
        }
        this.configureWebGl = configureWebGl?.bind(this) ?? this.configureWebGl;
        this.configureWebGl();
    }
    setDefaultViewport() {
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }
    calculateDefaultAspect() {
        return  this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    }
    initShaderProgram(vsSource, fsSource) {
      const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
    
      // Create the shader program
    
      const shaderProgram = this.gl.createProgram();
      this.gl.attachShader(shaderProgram, vertexShader);
      this.gl.attachShader(shaderProgram, fragmentShader);
      this.gl.linkProgram(shaderProgram);
    
      // If creating the shader program failed, alert
    
      if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      this.programInfo['program'] = shaderProgram;
      this.gl.useProgram(this.programInfo.program);
      return shaderProgram;
    }
    loadShader(type, source) {
      const shader = this.gl.createShader(type);
    
      // Send the source to the shader object
    
      this.gl.shaderSource(shader, source);
    
      // Compile the shader program
    
      this.gl.compileShader(shader);
    
      // See if it compiled successfully
    
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }
    
      return shader;
    }
    initBuffers(f = () => {}) {
      this.buffers = f.bind(this)();
    }
    drawScene(f = () => {}) {
        f.bind(this)();
    }     
}
