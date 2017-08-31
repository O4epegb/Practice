import { Vector } from './vector';

export enum Directions {
    North = 'n',
    NorthEast = 'ne',
    East = 'e',
    SouthEast = 'se',
    South = 's',
    SouthWest = 'sw',
    West = 'w',
    NorthWest = 'nw'
}

export const directions = {
    [Directions.North]: new Vector(0, -1),
    [Directions.NorthEast]: new Vector(1, -1),
    [Directions.East]: new Vector(1, 0),
    [Directions.SouthEast]: new Vector(1, 1),
    [Directions.South]: new Vector(0, 1),
    [Directions.SouthWest]: new Vector(-1, 1),
    [Directions.West]: new Vector(-1, 0),
    [Directions.NorthWest]: new Vector(-1, -1)
};

export const directionNames = Object.keys(directions) as Array<Directions>;
