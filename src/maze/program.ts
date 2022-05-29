export function square(coordinates: number[], width = 1) {
    const [x,y] = coordinates;
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y - width;
    return [x1, y1, x2, y1, x1, y2, x2, y1, x2, y2, x1, y2,]
}


export class Coordinate {
    private readonly CARTESIAN_SIZE: number = 2;
    private readonly REFERENCE_X: number = -1;
    private readonly REFERENCE_Y: number = 1;
    private readonly width = this.CARTESIAN_SIZE / this.cuts;

    constructor(private cuts: number) {
    }

    fromDiscreteToContinue(i: number) {
        return [
            this.width * (i % this.cuts) + this.REFERENCE_X,
            -this.width * Math.floor(i / this.cuts) + this.REFERENCE_Y
        ];
    }
    get WIDTH() {
        return this.width;
    }
}

export function makeMaze(cuts, graph): number[] {
    const vertices = [];
    const coordinate = new Coordinate(cuts);
    const cells = cuts ** 2;
    for (let n = 0; n < cells; n++) {
        if (graph.vertex(n.toString()).cost === 0) {
            vertices.push(...square(coordinate.fromDiscreteToContinue(n), coordinate.WIDTH));
        }
    }
    return vertices;
}