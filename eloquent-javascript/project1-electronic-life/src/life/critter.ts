import { randomElementFromArray } from './utils';
import { directionNames } from './directions';
import { WorldObject } from './models';


export class BouncingCritter implements WorldObject {
    direction: string;

    constructor() {
        this.direction = randomElementFromArray(directionNames);
    }

    act = (view) => {
        if (view.look(this.direction) != ' ')
            this.direction = view.find(' ') || 's';
        return {
            type: 'move',
            direction: this.direction
        };
    }
}
