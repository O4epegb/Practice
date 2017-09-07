import { directionNames, Directions } from '../../directions';
import { Critter, Action, ActionTypes } from '../../models';
import { View } from '../../view';

export class WallFollowerCritter extends Critter {
    direction: Directions;

    constructor(originChar: string) {
        super(originChar);
        this.direction = Directions.South;
    }

    act = (view: View): Action => {
        let start = this.direction;

        if (view.look(dirPlus(this.direction, -3)) != ' ') {
            start = this.direction = dirPlus(this.direction, -2);
        }

        while (view.look(this.direction) != ' ') {
            this.direction = dirPlus(this.direction, 1);
            if (this.direction == start) {
                break;
            }
        }

        return { type: ActionTypes.Move, direction: this.direction };
    };
}

function dirPlus(direction: Directions, n: number): Directions {
    const index = directionNames.indexOf(direction);
    return directionNames[(index + n + 8) % 8];
}
