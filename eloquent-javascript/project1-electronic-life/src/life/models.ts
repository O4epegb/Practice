import { Directions } from './directions';
import { View } from './view';

export type WorldMap = Array<string>;

export interface Legend {
    [key: string]: typeof WorldObject;
}

export class WorldObject {
    act: (view: View) => Action;
    originChar: string;

    constructor(originChar: string) {
        this.originChar = originChar;
    }
}

export interface Action {
    type: ActionType;
    direction: Directions;
}

type ActionType = 'move';
