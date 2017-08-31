import { directions, Directions } from './directions';
import { World, } from './world';
import { Vector } from './vector';
import { originCharFromWorldObject, randomElementFromArray } from './utils';


export class View {
    world: World;
    vector: Vector;

    constructor(world: World, vector: Vector) {
        this.world = world;
        this.vector = vector;
    }

    look(direction: Directions) {
        const target = this.vector.plus(directions[direction]);
        if (this.world.grid.isInside(target)) {
            return originCharFromWorldObject(this.world.grid.get(target));
        } else {
            return '#';
        }
    }

    findAll(char: string): Array<Directions> {
        const found = [];
        for (let direction in directions) {
            if (this.look(direction as Directions) === char) {
                found.push(direction as Directions);
            }
        }
        return found;
    }

    find(char: string) {
        const found = this.findAll(char);
        if (found.length === 0) {
            return null;
        }
        return randomElementFromArray(found);
    }
}
