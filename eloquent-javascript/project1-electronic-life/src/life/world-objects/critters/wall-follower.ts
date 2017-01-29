import { directionNames } from '../../directions';
import { WorldObject } from '../../models';


export class WallFollowerCritter extends WorldObject {
    direction: string;

    constructor(originChar: string) {
        super(originChar);
        this.direction = 's';
    }

    act = (view) => {
        var start = this.direction;
        if (view.look(dirPlus(this.direction, -3)) != ' ') {
            start = this.direction = dirPlus(this.direction, -2);
        }
        while (view.look(this.direction) != ' ') {
            this.direction = dirPlus(this.direction, 1);
            if (this.direction == start) {
                break;
            }
        }
        return { type: 'move', direction: this.direction };
    }
}

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}
