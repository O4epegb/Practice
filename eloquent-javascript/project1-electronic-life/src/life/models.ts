export type WorldMap = Array<string>;

export interface Legend {
    [key: string]: typeof WorldObject;
}

export class WorldObject {
    act: (view) => any;
}
