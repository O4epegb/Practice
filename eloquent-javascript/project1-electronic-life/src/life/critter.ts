import { randomElementFromArray } from './utils';


const directionNames = 'n ne e se s sw w nw'.split(' ');

export class BouncingCritter {
    direction: string;

    constructor() {
        this.direction = randomElementFromArray(directionNames);
    }

    act(view) {
        if (view.look(this.direction) != ' ')
            this.direction = view.find(' ') || 's';
        return {
            type: 'move',
            direction: this.direction
        };
    }
}
