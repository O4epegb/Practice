import { Entity } from '../models';

export class Wall extends Entity {
    name = 'wall';

    constructor(originChar: string) {
        super(originChar);
    }
}
