import {Graph, makeAGraphMaze} from "../Graph";

export function drawScene() {
    this.gl.drawArrays( this.gl.TRIANGLES, 0, this.buffers.vertices );
}

export function square(x, y, width=1) {
    const x1 = x;
    const x2 = x+width;
    const y1 = y;
    const y2 = y-width;
    return [
       x1, y1,
       x2, y1,
       x1, y2,
       x2, y1,
       x2, y2,
       x1, y2,
    ]
}
const CARTESIAN_SIZE = 2;

export function makeMaze(cuts, graph: Graph) {
    const vertices = [];
    const t = CARTESIAN_SIZE/cuts;  
    let n = 0;
    for(let i=0; i<cuts; i++) {
       for(let j=0; j<cuts; j++) {
           if (graph.vertex(n.toString()).cost === 0) {
              vertices.push(...square(-1+t*j, 1-t*i, t));
           }
           n++;
       }
    }
    return vertices;
}
  

export function initBuffers() {
    const n = 30;
    let [graph] = makeAGraphMaze(n);
    const vertices = makeMaze(n, graph);
    {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, buffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW );
        const coordinate = this.gl.getAttribLocation( this.programInfo.program, "coordinate" );
        this.gl.vertexAttribPointer( coordinate, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( coordinate );
    }  
    {
        // @ts-ignore
        const colors = vertices.map(() => [1, 1, 1]).flat();
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, buffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW );
        const colorAttribute = this.gl.getAttribLocation( this.programInfo.program, "color" );
        this.gl.vertexAttribPointer( colorAttribute, 3, this.gl.FLOAT, true, 0, 0 );
        this.gl.enableVertexAttribArray( colorAttribute );
    }
    return {
      vertices: vertices.length
    };
}