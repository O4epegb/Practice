import { Grid } from './grid';
import { Vector } from './vector';
import { View } from './view';
import { directions } from './directions';
import { WorldMap, Legend, Action, WorldObject } from './models';
import { worldObjectFromChar, originCharFromWorldObject } from './utils';


export class World {
    grid: Grid;
    legend: Legend;

    constructor(map: WorldMap, legend: Legend) {
        const grid = new Grid(map[0].length, map.length);

        map.forEach((line, y) => {
            for (var x = 0; x < line.length; x++) {
                grid.set(new Vector(x, y), worldObjectFromChar(legend, line[x]));
            }
        });

        this.grid = grid;
        this.legend = legend;
    }

    toString = () => {
        let output = '';
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                const element = this.grid.get(new Vector(x, y));
                output += originCharFromWorldObject(element);
            }
            output += '\n';
        }
        return output;
    }

    turn = () => {
        const acted: Array<WorldObject> = [];
        this.grid.forEach((critter, vector) => {
            if (critter.act && acted.indexOf(critter) == -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        });
    }

    letAct = (critter: WorldObject, vector: Vector) => {
        const action = critter.act(new View(this, vector));
        if (action && action.type == 'move') {
            const dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    }

    checkDestination = (action: Action, vector: Vector) => {
        if (directions.hasOwnProperty(action.direction)) {
            const dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest)) {
                return dest;
            }
        }
    }
}
