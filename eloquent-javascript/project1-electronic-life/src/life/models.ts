import { Directions } from './directions';
import { View } from './view';

export type WorldMap = Array<string>;

export interface Legend {
    [key: string]: typeof Entity;
}

export class Entity {
    originChar: string;

    constructor(originChar: string) {
        this.originChar = originChar;
    }
}

export class Critter extends Entity {
    energy = 0;
    act: (view: View) => Action;
}

export type WorldObject = Entity | Critter;

export interface Action {
    type: ActionTypes;
    direction?: Directions;
}

export enum ActionTypes {
    Eat = 'eat',
    Move = 'move',
    Reproduce = 'reproduce',
    Grow = 'grow',
    None = 'none'
}
