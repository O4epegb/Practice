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

const plan1 = [
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

const plan2 = [
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
    world1: World;
    world2: LifelikeWorld;

    constructor() {
        super();

        this.world1 = new World(plan1, {
            '#': Wall,
            o: BouncingCritter,
            '~': WallFollowerCritter
        });

        this.world2 = new LifelikeWorld(plan2, {
            '#': Wall,
            O: PlantEater,
            '*': Plant
        });

        this.state = {
            activeWorld: this.world1,
            fps: 5
        };
    }

    componentDidMount() {
        const turn = () => {
            this.makeWorldTurn();
            setTimeout(turn, 1000 / this.state.fps);
        };
        turn();
    }

    makeWorldTurn = () => {
        this.state.activeWorld.turn();
        this.forceUpdate();
    };

    increaseFps = () => {
        this.setState({ fps: this.state.fps + 1 });
    };

    decreaseFps = () => {
        const newFps = this.state.fps - 1;
        this.setState({ fps: newFps >= 1 ? newFps : 1 });
    };

    render() {
        return (
            <div className="wrapper">
                <div className="world">
                    <pre className="world__content">
                        {this.state.activeWorld.toString()}
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
                    </pre>
                </div>
            </div>
        );
    }
}
