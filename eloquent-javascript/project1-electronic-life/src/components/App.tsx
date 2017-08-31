import * as React from 'react';
import { World } from '../life/world';
import { Wall, BouncingCritter, WallFollowerCritter } from '../life/world-objects';


const plan = [
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

interface State {
    worldString: string;
    fps: number;
}

export class App extends React.Component<{}, State> {
    world: World;

    constructor() {
        super();
        this.state = {
            worldString: '',
            fps: 5
        };
    }

    componentDidMount() {
        this.world = new World(plan, {
            '#': Wall,
            'o': BouncingCritter,
            '~': WallFollowerCritter
        });

        const turn = () => {
            this.makeWorldTurn();
            setTimeout(turn, 1000 / this.state.fps);
        };
        turn();
    }

    makeWorldTurn = () => {
        this.world.turn();
        this.setState({
            worldString: this.world.toString()
        });
    }

    increaseFps = () => {
        this.setState({ fps: this.state.fps + 1 });
    }

    decreaseFps = () => {
        const newFps = this.state.fps - 1;
        this.setState({ fps: newFps >= 1 ? newFps : 1 });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="world">
                    <pre className="world__content">
                        {this.state.worldString}
                        <div className="world__controls">
                            <div>
                                Fps: {this.state.fps}
                            </div>
                            <button type="button" onClick={this.decreaseFps}>
                                Decrease
                            </button>
                            <button type="button" onClick={this.increaseFps}>
                                Increase
                            </button>
                        </div>
                    </pre>
                </div>
            </div>
        );
    }
}
