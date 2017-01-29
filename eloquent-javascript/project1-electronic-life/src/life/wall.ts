import { WorldObject } from './models';


export class Wall implements WorldObject {
    constructor() {

    }

    act = (view) => {
        return 1;
    }
}
