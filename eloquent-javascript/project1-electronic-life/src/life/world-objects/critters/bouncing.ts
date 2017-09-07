import { randomElementFromArray } from '../../utils';
import { directionNames, Directions } from '../../directions';
import { Critter, Action, ActionTypes } from '../../models';
import { View } from '../../view';

export class BouncingCritter extends Critter {
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
            type: ActionTypes.Move,
            direction: this.direction
        };
    };
}
