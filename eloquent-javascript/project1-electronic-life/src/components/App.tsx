import * as React from 'react';
import { World } from '../life/world';
import { LifelikeWorld } from '../life/lifelike-world';
import {
    Wall,
    BouncingCritter,
    WallFollowerCritter,
    Plant,
    PlantEater
} from '../life/world-objects';

const defaultPlan = [
    '############################',
    '#      #    #      o      ##',
    '#                          #',
    '#          #####           #',
    '##     ~   #   #    ##     #',
    '###           ##     #     #',
    '#           ###      #     #',
    '#   ####                   #',
    '#   ##       o             #',
    '# o  #         o       ### #',
    '#    #                     #',
    '############################'
];

const lifelifeWorldPlan = [
    '############################',
    '#####                 ######',
    '##   ***                **##',
    '#   *##**         **  O  *##',
    '#    ***     O    ##**    *#',
    '#       O         ##***    #',
    '#                 ##**     #',
    '#   O       #*             #',
    '#*          #**       O    #',
    '#***        ##**    O    **#',
    '##****     ###***       *###',
    '############################'
];

interface State {
    activeWorld: World | LifelikeWorld;
    fps: number;
}

export class App extends React.Component<{}, State> {
    gameLoop: number;
    world1: World;
    world2: LifelikeWorld;

    constructor() {
        super();

        this.world1 = new World(defaultPlan, {
            '#': Wall,
            o: BouncingCritter,
            '~': WallFollowerCritter
        });

        this.world2 = new LifelikeWorld(lifelifeWorldPlan, {
            '#': Wall,
            O: PlantEater,
            '*': Plant
        });

        this.state = {
            activeWorld: this.world1,
            fps: 10
        };
    }

    componentDidMount() {
        const turn = () => {
            this.gameLoop = window.setTimeout(turn, 1000 / this.state.fps);
            this.makeWorldTurn();
        };
        turn();
    }

    makeWorldTurn = () => {
        const { activeWorld } = this.state;
        activeWorld.turn();
        const plantEaters = activeWorld
            .getInfo()
            .critters.filter(
                critter => critter.act && !(critter instanceof Plant)
            );
        if (plantEaters.length === 0) {
            clearTimeout(this.gameLoop);
            console.log('GAME OVER, all critters have died');
        }
        this.forceUpdate();
    };

    increaseFps = () => {
        this.setState({ fps: this.state.fps + 1 });
    };

    decreaseFps = () => {
        this.setState({ fps: Math.max(this.state.fps - 1, 1) });
    };

    getCrittersInfo() {}

    render() {
        return (
            <div className="wrapper">
                <div className="world">
                    <pre className="world__content">
                        {this.state.activeWorld.toString()}
                    </pre>
                    <div className="world__controls">
                        <div>Fps: {this.state.fps}</div>
                        <button type="button" onClick={this.decreaseFps}>
                            Decrease
                        </button>
                        <button type="button" onClick={this.increaseFps}>
                            Increase
                        </button>
                        <div>Change world</div>
                        <button
                            type="button"
                            onClick={() =>
                                this.setState({ activeWorld: this.world1 })}
                        >
                            Default World
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                this.setState({ activeWorld: this.world2 })}
                        >
                            Lifelike World
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
