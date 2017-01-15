import { Grid } from './grid';
import { Vector } from './vector';
import { View } from './view';
import { directions } from './directions';


export function elementFromChar(legend, ch) {
    if (ch == ' ')
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

export function charFromElement(element) {
    if (element == null)
        return ' ';
    else
        return element.originChar;
}

export class World {
    grid: Grid;
    legend;

    constructor(map, legend) {
        const grid = new Grid(map[0].length, map.length);

        map.forEach((line, y) => {
            for (var x = 0; x < line.length; x++) {
                grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
            }
        });

        this.grid = grid;
        this.legend = legend;
    }

    toString() {
        let output = '';
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                const element = this.grid.get(new Vector(x, y));
                output += charFromElement(element);
            }
            output += '\n';
        }
        return output;
    }

    turn() {
        var acted = [];
        this.grid.forEach((critter, vector) => {
            if (critter.act && acted.indexOf(critter) == -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        });
    }

    letAct(critter, vector) {
        var action = critter.act(new View(this, vector));
        if (action && action.type == 'move') {
            var dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    };

    checkDestination(action, vector) {
        if (directions.hasOwnProperty(action.direction)) {
            var dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest))
                return dest;
        }
    };
}
