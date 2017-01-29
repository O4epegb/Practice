import * as React from 'react';
import { World } from '../life/world';
import { Wall } from '../life/wall';
import { BouncingCritter } from '../life/critter';
import { WallFollowerCritter } from '../life/critter-wall-follower';


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
    worldString?: string;
    worldSpeed?: number;
}

export class App extends React.Component<{}, State> {
    world: World;

    constructor() {
        super();
        this.state = {
            worldString: '',
            worldSpeed: 300
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
            setTimeout(turn, this.state.worldSpeed);
        };
        turn();
    }

    makeWorldTurn = () => {
        this.world.turn();
        this.setState({
            worldString: this.world.toString()
        });
    }

    increaseSpeed = () => {
        const newSpeed = this.state.worldSpeed - 50;
        this.setState({ worldSpeed: newSpeed >= 50 ? newSpeed : 50 });
    }

    decreaseSpeed = () => {
        this.setState({ worldSpeed: this.state.worldSpeed + 50 });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="world">
                    <pre className="world__content">
                        {this.state.worldString}
                        <div className="world__controls">
                            <div>
                                Speed
                            </div>
                            <button type="button" onClick={this.decreaseSpeed}>
                                Decrease
                            </button>
                            <button type="button" onClick={this.increaseSpeed}>
                                Increase
                            </button>
                        </div>
                    </pre>
                </div>
            </div>
        );
    }
}
