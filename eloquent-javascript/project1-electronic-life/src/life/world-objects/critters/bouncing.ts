import { randomElementFromArray } from '../../utils';
import { directionNames } from '../../directions';
import { WorldObject } from '../../models';


export class BouncingCritter extends WorldObject {
    direction: string;

    constructor(originChar: string) {
        super(originChar);
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
