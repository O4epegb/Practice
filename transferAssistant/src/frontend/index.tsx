import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';
import * as utils from '../utils';
import { shortcutNames } from '../constants';
import { inputs } from '../inputPositions';
import { getPlayers, savePlayers } from '../players';
import { Player } from '../models';

interface State {
    allPlayers: Array<Player>;
    players: Array<Player>;
    lastPlayerPrice: string;
    priceIncrease: number;
    currentPlayerIndex: number;
    newPlayer: Player;
    priceMultiplier: number;
    priceDecrease: number;
    shouldAutoSearch: boolean;
    priceFrom: number;
    priceTo: number;
}

class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            allPlayers: [],
            players: [],
            lastPlayerPrice: '',
            priceIncrease: 0,
            currentPlayerIndex: 0,
            newPlayer: {
                name: '',
                price: '',
                rating: ''
            },
            priceMultiplier: 0.8,
            priceDecrease: 1500,
            shouldAutoSearch: false,
            priceFrom: 8000,
            priceTo: 9000
        };
    }

    componentDidMount() {
        this.reloadPlayersFromDb();

        ipcRenderer.on('shortcut-press', (event, shortcutName) => {
            switch (shortcutName) {
                case shortcutNames.one: {
                    utils
                        .moveAndClick(inputs.firstPlayerCard)
                        .then(() => {
                            return utils.delay(500);
                        })
                        .then(() => {
                            // utils.moveAndClick(inputs.buyNowButton);
                        });
                    break;
                }
                case shortcutNames.two: {
                    // utils.moveAndClick(inputs.popupCenterAndLeftButtons);
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
        const price = Number(player.price);
        return price < this.state.priceTo + 1 && price > this.state.priceFrom - 1;
    };

    changePlayerName = (event: React.ChangeEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.name = event.target.value;
        this.setState({ players: this.state.players });
    };

    changePlayerPrice = (event: React.ChangeEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.price = event.target.value;
        this.setState({ players: this.state.players });
    };

    changePlayerRating = (event: React.ChangeEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.rating = event.target.value;
        this.setState({ players: this.state.players });
    };

    changeNewPlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                name: event.target.value
            }
        });
    };

    changeNewPlayerPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                price: event.target.value
            }
        });
    };

    changeNewPlayerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPlayer: {
                ...this.state.newPlayer,
                rating: event.target.value
            }
        });
    };

    addPlayer = () => {
        const { name, rating, price } = this.state.newPlayer;
        if (name && rating && price) {
            this.setState({
                players: [...this.state.players, this.state.newPlayer],
                newPlayer: {
                    name: '',
                    price: '',
                    rating: ''
                }
            });
        }
    };

    savePlayers = () => {
        const players = this.state.allPlayers.slice().sort((a, b) => Number(a.price) - Number(b.price));
        savePlayers(players)
            .then(() => {
                utils.log('Players saved successfully');
            })
            .catch(err => {
                utils.log('Failed to save players', err);
            });
    };

    reloadPlayersFromDb = () => {
        getPlayers().then(players => {
            console.log(players);
            this.setState({
                allPlayers: players,
                players: players.filter(this.filterFunction)
            });
        });
    };

    randomizePlayers = () => {
        this.setState({
            players: utils.randomSort(this.state.players),
            currentPlayerIndex: 0
        });
    };

    changeActiveIndex = (index: number) => {
        this.setState({ currentPlayerIndex: index });
    };

    changeFilterFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPriceFrom = Number(event.target.value);
        this.setState({ priceFrom: newPriceFrom }, () => {
            this.reloadPlayersFromDb();
        });
    };

    changeFilterTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPriceTo = Number(event.target.value);
        this.setState({ priceTo: newPriceTo }, () => {
            this.reloadPlayersFromDb();
        });
    };

    changePriceMultiplier = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMultiplier = Number(event.target.value);
        this.setState({ priceMultiplier: newMultiplier });
    };

    changePriceDecrease = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDecrease = Number(event.target.value);
        this.setState({ priceDecrease: newDecrease });
    };

    toggleAutoSearch = () => {
        const autoSearchState = !this.state.shouldAutoSearch;
        this.setState({ shouldAutoSearch: autoSearchState });
        utils.notify(`AutoSearch toggled to ${autoSearchState.toString()}`);
    };

    searchHandler = () => {
        let { players, lastPlayerPrice, priceIncrease, currentPlayerIndex } = this.state;

        if (players.length === 0) {
            utils.log('No players in DB');
            return;
        }

        if (currentPlayerIndex >= players.length) {
            players = utils.randomSort(players);
            currentPlayerIndex = 0;
            this.setState({
                currentPlayerIndex: 0,
                players,
                priceIncrease: priceIncrease + 1
            });
        }
        const currentPlayer = players[currentPlayerIndex];
        this.setState({
            currentPlayerIndex: currentPlayerIndex + 1
        });

        const priceIncreaseNumber = priceIncrease * 100;
        const priceWithDiscount = Number(currentPlayer.price) * this.state.priceMultiplier;
        const discount = Number(currentPlayer.price) - priceWithDiscount;
        const actualDiscount = discount < 1000 ? 1000 : discount > 5000 ? 5000 : discount;
        const price = Number(currentPlayer.price) - actualDiscount + priceIncreaseNumber;
        const priceString = price < 500 ? currentPlayer.price : String(price.toFixed(0));

        this.setState({
            lastPlayerPrice: priceString
        });

        console.log(`Checking player "${currentPlayer.name}" with minPrice = ${priceString}`);

        utils
            .delay(0)
            .then(() => {
                utils.moveAndClick(inputs.clearPlayerInput);
                return utils.delay(100);
            })
            .then(() => {
                utils.moveAndClick(inputs.playerInput);
                return utils.delay(100);
            })
            .then(() => {
                utils.typeString(currentPlayer.name);
                return utils.delay(1000);
            })
            .then(() => {
                const playerNotFoundIconColor = utils.getPixelColor(inputs.playerNotFoundIcon);
                if (playerNotFoundIconColor === inputs.playerNotFoundIcon.color) {
                    if (this.state.shouldAutoSearch) {
                        setTimeout(() => {
                            if (this.state.shouldAutoSearch) {
                                this.searchHandler();
                            }
                        }, 300);
                        throw Error(`Player ${currentPlayer.name} not found in the list`);
                    }
                }
                utils.moveAndClick(inputs.playerIcon);
                return utils.delay(50);
            })
            .then(() => {
                utils.moveAndClick(inputs.priceInput);
                return utils.delay(100);
            })
            .then(() => {
                if (lastPlayerPrice !== priceString) {
                    this.setState({
                        lastPlayerPrice: priceString
                    });
                    utils.typeString(priceString);
                    return utils.delay(100);
                }
            })
            .then(() => {
                utils.moveAndClick(inputs.searchButton);
                return utils.delay(300);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    function checkColors() {
                        const modifySearchButtonColor = utils.getPixelColor(inputs.modifySearchButton);
                        if (modifySearchButtonColor === inputs.modifySearchButton.color) {
                            resolve(false);
                            return;
                        }

                        const firstPlayerCardColor = utils.getPixelColor(inputs.firstPlayerCard);
                        if (firstPlayerCardColor === inputs.firstPlayerCard.color) {
                            resolve(true);
                            return;
                        }
                        setTimeout(checkColors, 200);
                    }

                    checkColors();
                });
            })
            .then(wasFound => {
                if (wasFound) {
                    utils.notify(`FOUND! ${currentPlayer.name}`, `For less than ${priceString} gold`);
                } else {
                    utils.log(`Not found! ${currentPlayer.name}`, `For less than ${priceString} gold`);
                    utils.moveAndClick(inputs.modifySearchButton);
                    return utils.waitForColor(inputs.searchButton.color, inputs.searchButton).then(() => {
                        if (this.state.shouldAutoSearch) {
                            this.searchHandler();
                        }
                    });
                }
            })
            .catch(err => {
                console.log(`Something went wrong.`, err);
            });
    };

    render() {
        return (
            <div>
                <div style={{ position: 'fixed', background: '#eeeeee', top: 0 }}>
                    <button type="button" onClick={this.savePlayers}>
                        Save
                    </button>
                    <button type="button" onClick={this.reloadPlayersFromDb}>
                        Reload from DB
                    </button>
                    <button type="button" onClick={this.randomizePlayers}>
                        Randomize
                    </button>
                    <button type="button" onClick={this.toggleAutoSearch}>
                        AutoSearch {this.state.shouldAutoSearch.toString()}
                    </button>
                    <div style={{ margin: '20px 0' }}>
                        <input
                            type="text"
                            placeholder="name"
                            value={this.state.newPlayer.name}
                            onChange={event => this.changeNewPlayerName(event)}
                        />
                        <input
                            type="text"
                            placeholder="price"
                            value={this.state.newPlayer.price}
                            onChange={event => this.changeNewPlayerPrice(event)}
                        />
                        <input
                            type="text"
                            placeholder="rating"
                            value={this.state.newPlayer.rating}
                            onChange={event => this.changeNewPlayerRating(event)}
                        />
                        <button type="button" onClick={this.addPlayer}>
                            Add player
                        </button>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <div>Price filter</div>
                        <input
                            type="text"
                            placeholder="price from"
                            value={this.state.priceFrom}
                            onChange={event => this.changeFilterFrom(event)}
                        />
                        <input
                            type="text"
                            placeholder="price to"
                            value={this.state.priceTo}
                            onChange={event => this.changeFilterTo(event)}
                        />
                        <div>Price multiplier</div>
                        <input
                            type="text"
                            placeholder="multiplier"
                            value={this.state.priceMultiplier}
                            onChange={event => this.changePriceMultiplier(event)}
                        />
                        <div>Price decrease</div>
                        <input
                            type="text"
                            placeholder="decrease"
                            value={this.state.priceDecrease}
                            onChange={event => this.changePriceDecrease(event)}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: '240px' }}>
                    {this.state.players.length > 0 ? (
                        this.state.players.map((player, index) => {
                            return (
                                <div
                                    key={player.name}
                                    style={{
                                        background: `${index === this.state.currentPlayerIndex ? 'tomato' : 'white'}`
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={event => this.changePlayerName(event, player)}
                                    />
                                    <input
                                        type="text"
                                        value={player.price}
                                        style={{ width: '80px' }}
                                        onChange={event => this.changePlayerPrice(event, player)}
                                    />
                                    <input
                                        type="text"
                                        value={player.rating}
                                        style={{ width: '40px' }}
                                        onChange={event => this.changePlayerRating(event, player)}
                                    />
                                    <button type="button" onClick={() => this.changeActiveIndex(index)}>
                                        Set active
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div>No players loaded.</div>
                    )}
                </div>
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
