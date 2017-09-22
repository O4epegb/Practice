import { Vector } from './vector';
import { World } from './world';
import { View } from './view';
import { WorldMap, Legend, Action, Critter, ActionTypes } from './models';
import { worldObjectFromChar } from './utils';

export class LifelikeWorld extends World {
    actionTypes = getActions();

    constructor(map: WorldMap, legend: Legend) {
        super(map, legend);
    }

    letAct = (critter: Critter, vector: Vector) => {
        const action = critter.act(new View(this, vector));
        const handled =
            action &&
            action.type in this.actionTypes &&
            this.actionTypes[action.type](this, critter, vector, action);

        if (!handled) {
            critter.energy = critter.energy - 0.2;
            if (critter.energy <= 0) {
                this.grid.set(vector, null);
            }
        }
    };
}

function getActions() {
    return {
        [ActionTypes.Grow](
            world: LifelikeWorld,
            critter: Critter,
            vector: Vector,
            action: Action
        ) {
            critter.energy = critter.energy + 0.5;
            return true;
        },

        [ActionTypes.Move](
            world: LifelikeWorld,
            critter: Critter,
            vector: Vector,
            action: Action
        ) {
            const dest = world.checkDestination(action, vector);
            if (
                dest == null ||
                critter.energy <= 1 ||
                world.grid.get(dest) != null
            ) {
                return false;
            }
            critter.energy = critter.energy - 1;
            world.grid.set(vector, null);
            world.grid.set(dest, critter);
            return true;
        },

        [ActionTypes.Eat](
            world: LifelikeWorld,
            critter: Critter,
            vector: Vector,
            action: Action
        ) {
            const dest = world.checkDestination(action, vector);
            if (!dest) {
                return false;
            }
            const atDest = world.grid.get(dest);
            if (!atDest || atDest.energy == null) {
                return false;
            }
            critter.energy = critter.energy + atDest.energy;
            world.grid.set(dest, null);
            return true;
        },

        [ActionTypes.Reproduce](
            world: LifelikeWorld,
            critter: Critter,
            vector: Vector,
            action: Action
        ) {
            const baby = worldObjectFromChar(world.legend, critter.originChar);
            const dest = world.checkDestination(action, vector);

            if (baby && baby instanceof Critter) {
                if (
                    dest == null ||
                    critter.energy <= 2 * baby.energy ||
                    world.grid.get(dest) != null
                ) {
                    return false;
                }
                critter.energy = critter.energy - 2 * baby.energy;
                world.grid.set(dest, baby);
                return true;
            } else {
                return false;
            }
        }
    };
}
