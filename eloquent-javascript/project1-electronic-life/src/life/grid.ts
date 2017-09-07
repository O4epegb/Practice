import { Vector } from './vector';
import { Critter } from './models';

export class Grid {
    width: number;
    height: number;
    space: Array<Critter>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.space = new Array(width * height);
    }

    isInside(vector: Vector) {
        return (
            vector.x >= 0 &&
            vector.x < this.width &&
            vector.y >= 0 &&
            vector.y < this.height
        );
    }

    get(vector: Vector) {
        return this.space[vector.x + this.width * vector.y];
    }

    set(vector: Vector, value: any) {
        this.space[vector.x + this.width * vector.y] = value;
    }

    forEach(f: (worldObject: Critter, vector: Vector) => void) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const value = this.space[x + y * this.width];
                if (value != null) f(value, new Vector(x, y));
            }
        }
    }
}
