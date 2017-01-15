export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(anotherVector: Vector) {
        return new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
    }
}
