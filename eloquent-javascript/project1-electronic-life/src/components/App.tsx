import * as React from 'react';
import { World } from '../life/world';
import { Wall } from '../life/wall';
import { BouncingCritter } from '../life/critter';


const plan =
    ['############################',
        '#      #    #      o      ##',
        '#                          #',
        '#          #####           #',
        '##         #   #    ##     #',
        '###           ##     #     #',
        '#           ###      #     #',
        '#   ####                   #',
        '#   ##       o             #',
        '# o  #         o       ### #',
        '#    #                     #',
        '############################'];

interface State {
    worldString: string;
}

export class App extends React.Component<{}, State> {
    world: World;

    constructor() {
        super();
        this.state = {
            worldString: ''
        };
    }

    componentDidMount() {
        this.world = new World(plan, { '#': Wall, 'o': BouncingCritter });
        setInterval(() => {
            this.world.turn();
            this.setState({
                worldString: this.world.toString()
            });
        }, 300);
    }

    render() {

        return (
            <div className="wrapper">
                <div className="world">
                    <pre className="world__content">
                        {this.state.worldString}
                    </pre>
                </div>
            </div>
        );
    }
}
