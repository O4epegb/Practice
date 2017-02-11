import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';
import * as utils from '../utils';
import { shortcutNames } from '../constants';
import { inputs } from '../inputPositions';
import { getPlayers, savePlayers } from '../players';
import { Player } from '../models';
// import { searchHandler } from './searchHandler';
// import './styles';


interface State {
    allPlayers?: Array<Player>;
    players?: Array<Player>;
    lastPlayerPrice?: string;
    needToUpdateMinPrice?: boolean;
    currentPlayerIndex?: number;
    newPlayer?: Player;
    pricePercent?: number;
    shouldAutoSearch?: boolean;
}

class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            allPlayers: [],
            players: [],
            lastPlayerPrice: '',
            needToUpdateMinPrice: false,
            currentPlayerIndex: 0,
            newPlayer: {
                name: '',
                price: '',
                alias: ''
            },
            pricePercent: 0.80,
            shouldAutoSearch: false
        };
    }

    componentDidMount() {
        this.reloadPlayersFromDb();

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
                    this.toggleAutoSearch();
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

    filterFunction = (player: Player) => {
        // return true;
        const price = Number(player.price);
        return price < 31000 && price > 4000;
    }

    changePlayerName = (event: React.ChangeEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.name = event.target.value;
        this.setState({ players: this.state.players });
    }

    changePlayerPrice = (event: React.ChangeEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.price = event.target.value;
        this.setState({ players: this.state.players });
    }

    changeNewPlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                name: event.target.value
            }
        });
    }

    changeNewPlayerPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                price: event.target.value
            }
        });
    }

    changeNewPlayerAlias = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                alias: event.target.value
            }
        });
    }

    addPlayer = () => {
        const {name, alias, price} = this.state.newPlayer;
        if (name && alias && price) {
            this.setState({
                players: [...this.state.players, this.state.newPlayer]
            });
        }
    }

    savePlayers = () => {
        const players = this.state.allPlayers.slice().sort((a, b) => Number(a.price) - Number(b.price));
        savePlayers(players).then(() => {
            utils.log('Players saved successfully');
        }).catch((err) => {
            utils.log('Failed to save players', err);
        });
    }

    reloadPlayersFromDb = () => {
        getPlayers().then((players) => {
            console.log(players);
            this.setState({
                allPlayers: players,
                players: players.filter(this.filterFunction)
            });
        });
    }

    randomizePlayers = () => {
        this.setState({
            players: utils.randomSort(this.state.players),
            needToUpdateMinPrice: true,
            currentPlayerIndex: 0
        });
    }

    changeActiveIndex = (index: number) => {
        this.setState({ currentPlayerIndex: index });
    }

    toggleAutoSearch = () => {
        const autoSearchState = !this.state.shouldAutoSearch;
        this.setState({ shouldAutoSearch: autoSearchState });
        utils.notify(`AutoSearch toggled to ${autoSearchState.toString()}`);
    }

    searchHandler = () => {
        let {players, lastPlayerPrice, needToUpdateMinPrice, currentPlayerIndex} = this.state;

        if (players.length === 0) {
            utils.log('No players in DB');
            return;
        }

        if (currentPlayerIndex >= players.length) {
            needToUpdateMinPrice = true;
            players = utils.randomSort(players);
            currentPlayerIndex = 0;
            this.setState({
                currentPlayerIndex: 0,
                players
            });
        } else {
            needToUpdateMinPrice = false;
        }
        const currentPlayer = players[currentPlayerIndex];
        this.setState({
            currentPlayerIndex: currentPlayerIndex + 1,
            needToUpdateMinPrice
        });

        const price = String(Number(currentPlayer.price) * this.state.pricePercent);

        console.log(`Checking player "${currentPlayer.name}" with minPrice = ${price}`);

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
                if (lastPlayerPrice !== price) {
                    this.setState({
                        lastPlayerPrice: price
                    });
                    utils.typeString(price);
                    return utils.delay(100);
                }
            }).then(() => {
                if (needToUpdateMinPrice) {
                    utils.moveAndClick(inputs.increaseBuyNowMinPrice);
                    return utils.delay(100);
                }
            }).then(() => {
                utils.moveAndClick(inputs.searchButton);
                return utils.delay(300);
            }).then(() => {
                return new Promise((resolve, reject) => {
                    function checkColors() {
                        const buttonColor = utils.getPixelColor(inputs.searchNotFound);
                        const popupColor = utils.getPixelColor(inputs.popupWhiteLine);
                        if (buttonColor === inputs.searchNotFound.color && popupColor === inputs.popupWhiteLine.color) {
                            resolve(false);
                            return;
                        }

                        const playersListColor = utils.getPixelColor(inputs.playersListWhiteLine);
                        if (playersListColor === inputs.playersListWhiteLine.color) {
                            resolve(true);
                            return;
                        }
                        setTimeout(checkColors, 200);
                    }
                    checkColors();
                });
            }).then((wasFound) => {
                if (wasFound) {
                    utils.notify(`FOUND! ${currentPlayer.name}`, `For less than ${price} gold`);
                } else {
                    utils.log(`Not found! ${currentPlayer.name}`, `For less than ${price} gold`);
                    utils.moveAndClick(inputs.popupCenterAndLeftButtons);
                    utils.delay(400).then(() => {
                        if (this.state.shouldAutoSearch) {
                            this.searchHandler();
                        }
                    });
                }
            }).catch((err) => {
                console.log(`Something went wrong.`, err);
            });
    }

    render() {
        if (this.state.players.length === 0) {
            return (
                <div>
                    No players loaded.
                </div>
            );
        }
        return (
            <div>
                <button type="button" onClick={this.toggleAutoSearch}>
                    AutoSearch {this.state.shouldAutoSearch.toString()}
                </button>
                <button type="button" onClick={this.savePlayers}>
                    Save
                </button>
                <button type="button" onClick={this.reloadPlayersFromDb}>
                    Reload from DB
                </button>
                <button type="button" onClick={this.randomizePlayers}>
                    Randomize
                </button>
                <div>
                    <input type="text" value={this.state.newPlayer.name} onChange={(event) => this.changeNewPlayerName(event)} />
                    <input type="text" value={this.state.newPlayer.price} onChange={(event) => this.changeNewPlayerPrice(event)} />
                    <input type="text" value={this.state.newPlayer.alias} onChange={(event) => this.changeNewPlayerAlias(event)} />
                    <button type="button" onClick={this.addPlayer}>
                        Add player
                    </button>
                </div>
                {this.state.players.map((player, index) => {
                    return (
                        <div key={player.name}
                            style={{ background: `${index === this.state.currentPlayerIndex ? 'tomato' : 'white'}` }}>
                            <input type="text" value={player.name} onChange={(event) => this.changePlayerName(event, player)} />
                            <input type="text" value={player.price} onChange={(event) => this.changePlayerPrice(event, player)} />
                            <button type="button" onClick={() => this.changeActiveIndex(index)}>
                                Set active
                            </button>
                        </div>
                    );
                })}
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
