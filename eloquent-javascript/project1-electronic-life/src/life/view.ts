import { directions } from './directions';
import { World, charFromElement } from './world';
import { Vector } from './vector';
import { randomElementFromArray } from './utils';


export class View {
    world: World;
    vector: Vector;

    constructor(world: World, vector: Vector) {
        this.world = world;
        this.vector = vector;
    }

    look(dir) {
        const target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target)) {
            return charFromElement(this.world.grid.get(target));
        } else {
            return '#';
        }
    }

    findAll(ch) {
        const found = [];
        for (let dir in directions) {
            if (this.look(dir) == ch) {
                found.push(dir);
            }
        }
        return found;
    }

    find(ch) {
        var found = this.findAll(ch);
        if (found.length == 0) {
            return null;
        }
        return randomElementFromArray(found);
    }
}
