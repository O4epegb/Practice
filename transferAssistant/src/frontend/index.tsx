// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';
import { shortcutNames } from '../constants';
import * as utils from '../utils';
import { inputs } from '../inputPositions';
import { getPlayers } from '../players';
import { Player } from '../models';
// import { App } from './components/App';

// import './styles';


interface State {
    players?: Array<Player>;
}

class App extends React.Component<{}, State> {
    lastPlayerPrice = '';
    needToUpdateMinPrice = false;
    playerCounter = 0;

    constructor() {
        super();
        this.state = {
            players: []
        };
    }

    componentDidMount() {
        getPlayers().then((players) => {
            console.log(players);
            this.setState({ players });
        });
        ipcRenderer.on('shortcut-press', (event, shortcutName) => {
            switch (shortcutName) {
                case shortcutNames.one: {
                    utils.moveAndClick(inputs.firstPlayerCard).then(() => {
                        return utils.delay(500);
                    }).then(() => {
                        utils.moveAndClick(inputs.buyNowButton);
                    });
                    break;
                }
                case shortcutNames.two: {
                    utils.moveAndClick(inputs.popupCenterAndLeftButtons);
                    break;
                }
                case shortcutNames.three: {
                    this.searchHandler();
                    break;
                }
                case shortcutNames.four: {
                    utils.moveAndClick(inputs.backButton);
                    break;
                }
                case shortcutNames.five: {
                    //
                    break;
                }
                case shortcutNames.six: {
                    const coords = utils.getMouseCoords();
                    console.log(`Coords: x: ${coords.x}, y: ${coords.y}; Color: #${utils.getPixelColor(coords)}`);
                    break;
                }
            }
        });
    }

    searchHandler = () => {
        let {players} = this.state;

        if (this.playerCounter >= players.length) {
            this.needToUpdateMinPrice = true;
            players = utils.randomSort(players);
            this.playerCounter = 0;
        } else {
            this.needToUpdateMinPrice = false;
        }
        const currentPlayer = players[this.playerCounter];
        ++this.playerCounter;

        console.log(`Checking player "${currentPlayer.name}" with minPrice = ${currentPlayer.price}`);

        utils.delay(0)
            .then(() => {
                utils.moveAndClick(inputs.clearPlayerInput);
                return utils.delay(100);
            }).then(() => {
                utils.moveAndClick(inputs.playerInput);
                return utils.delay(100);
            }).then(() => {
                utils.typeString(currentPlayer.alias);
                return utils.delay(1000);
            }).then(() => {
                utils.moveAndClick(inputs.playerIcon);
                return utils.delay(50);
            }).then(() => {
                utils.moveAndClick(inputs.priceInput, true);
                return utils.delay(100);
            }).then(() => {
                if (this.lastPlayerPrice !== currentPlayer.price) {
                    this.lastPlayerPrice = currentPlayer.price;
                    utils.typeString(currentPlayer.price);
                    return utils.delay(100);
                }
            }).then(() => {
                if (this.needToUpdateMinPrice) {
                    utils.moveAndClick(inputs.increaseBuyNowMinPrice);
                    return utils.delay(100);
                }
            }).then(() => {
                utils.moveAndClick(inputs.searchButton);
                return utils.delay(300);
            }).then(() => {
                const color = utils.getPixelColor(inputs.popupCenterAndLeftButtons);
                console.log('checking color', color, inputs.popupCenterAndLeftButtons.color);
                if (color === inputs.popupCenterAndLeftButtons.color) {
                    console.log('Not found!!');
                }
                const color2 = utils.getPixelColor(inputs.backButton);
                console.log('checking color', color2, inputs.backButton.color);
                if (color2 === inputs.backButton.color) {
                    console.log('Found!!');
                }
                utils.moveAndClick(inputs.popupCenterAndLeftButtons);
            }).catch((err) => {
                console.log(`Something went wrong.`, err);
            });
    }

    render() {
        return (
            <div>
                keks
            </div>
        );
    }
}

function main() {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    ReactDom.render(<App />, container);
}

main();
