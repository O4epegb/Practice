import { randomElementFromArray } from '../../utils';
import { directionNames, Directions } from '../../directions';
import { WorldObject, Action } from '../../models';
import { View } from '../../view';

export class BouncingCritter extends WorldObject {
    direction: Directions;

    constructor(originChar: string) {
        super(originChar);
        this.direction = randomElementFromArray(directionNames);
    }

    act = (view: View): Action => {
        if (view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || Directions.South;
        }
        return {
            type: 'move',
            direction: this.direction
        };
    };
}
