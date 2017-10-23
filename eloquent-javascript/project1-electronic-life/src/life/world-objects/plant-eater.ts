import { Critter, ActionTypes } from '../models';
import { View } from '../view';

export class PlantEater extends Critter {
    energy = 20;
    name = 'plant eater';

    constructor(originChar: string) {
        super(originChar);
    }

    act = (view: View) => {
        const space = view.find(' ');
        const plant = view.find('*');

        if (this.energy > 60 && space) {
            return { type: ActionTypes.Reproduce, direction: space };
        }

        if (plant) {
            return { type: ActionTypes.Eat, direction: plant };
        }

        if (space) {
            return { type: ActionTypes.Move, direction: space };
        }

        return { type: ActionTypes.None };
    };
}
