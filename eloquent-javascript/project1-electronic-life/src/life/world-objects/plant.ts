import { Critter, ActionTypes } from '../models';
import { View } from '../view';

export class Plant extends Critter {
    energy = 3 + Math.random() * 4;
    name = 'plant';

    constructor(originChar: string) {
        super(originChar);
    }

    act = (view: View) => {
        if (this.energy > 15) {
            const space = view.find(' ');

            if (space) {
                return { type: ActionTypes.Reproduce, direction: space };
            }
        }

        if (this.energy < 20) {
            return { type: ActionTypes.Grow };
        }

        return { type: ActionTypes.None };
    };
}
