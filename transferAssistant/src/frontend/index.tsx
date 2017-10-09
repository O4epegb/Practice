import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';
import * as u from '../utils';
import { shortcutNames, microDelay } from '../constants';
import { inputs } from '../inputPositions';
import { getPlayers, savePlayers } from '../players';
import { Player } from '../models';
import { reloadFutbinData } from '../reloadData';

interface State {
    allPlayers: Array<Player>;
    players: Array<Player>;
    priceIncrease: number;
    currentPlayerIndex: number;
    newPlayer: Player;
    priceMultiplier: number;
    priceDecrease: number;
    shouldAutoSearch: boolean;
    priceFrom: number;
    priceTo: number;
    maxPrice: number;
    futbinPagesToLoad: number;
}

class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            allPlayers: [],
            players: [],
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
            priceFrom: 12000,
            priceTo: 50000,
            maxPrice: 200000,
            futbinPagesToLoad: 10
        };
    }

    componentDidMount() {
        this.reloadPlayersFromDb();

        ipcRenderer.on('shortcut-press', (event, shortcutName) => {
            switch (shortcutName) {
                case shortcutNames.one: {
                    u.moveAndClick(inputs.buyNowButton);
                    break;
                }
                case shortcutNames.two: {
                    u.moveAndClick(inputs.buyNowButtonOk);
                    break;
                }
                case shortcutNames.three: {
                    this.searchHandler();
                    break;
                }
                case shortcutNames.four: {
                    u.moveAndClick(inputs.backButton);
                    break;
                }
                case shortcutNames.five: {
                    this.toggleAutoSearch();
                    break;
                }
                case shortcutNames.six: {
                    const coords = u.getMouseCoords();
                    console.log(`Coords: x: ${coords.x}, y: ${coords.y}; Color: #${u.getPixelColor(coords)}`);
                    break;
                }
            }
        });
    }

    filterFunction = (player: Player) => {
        const price = Number(player.price);
        return price < this.state.priceTo + 1 && price > this.state.priceFrom - 1;
    };

    changePlayerName = (event: React.FocusEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.name = (event.target as any).value;
        this.setState({ players: this.state.players });
    };

    changePlayerPrice = (event: React.FocusEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.price = (event.target as any).value;
        this.setState({ players: this.state.players });
    };

    changePlayerRating = (event: React.FocusEvent<HTMLInputElement>, changedPlayer: Player) => {
        changedPlayer.rating = (event.target as any).value;
        this.setState({ players: this.state.players });
    };

    savePlayers = () => {
        const players = this.state.allPlayers.slice().sort((a, b) => Number(a.price) - Number(b.price));
        savePlayers(players)
            .then(() => {
                u.log('Players saved successfully');
            })
            .catch(err => {
                u.log('Failed to save players', err);
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

    reloadFromFutbin = () => {
        reloadFutbinData(this.state.futbinPagesToLoad).then(() => {
            this.reloadPlayersFromDb();
        });
    };

    randomizePlayers = () => {
        this.setState({
            players: u.randomSort(this.state.players),
            currentPlayerIndex: 0
        });
    };

    changeActiveIndex = (index: number) => {
        this.setState({ currentPlayerIndex: index });
    };

    changeFilterFrom = (event: React.FocusEvent<HTMLInputElement>) => {
        const newPriceFrom = Number((event.target as any).value);
        this.setState({ priceFrom: newPriceFrom }, () => {
            this.reloadPlayersFromDb();
        });
    };

    changeFilterTo = (event: React.FocusEvent<HTMLInputElement>) => {
        const newPriceTo = Number((event.target as any).value);
        this.setState({ priceTo: newPriceTo }, () => {
            this.reloadPlayersFromDb();
        });
    };

    changeFutbinPages = (event: React.FocusEvent<HTMLInputElement>) => {
        const futbinPagesToLoad = Number((event.target as any).value);
        this.setState({ futbinPagesToLoad });
    };

    changePriceMultiplier = (event: React.FocusEvent<HTMLInputElement>) => {
        const newMultiplier = Number((event.target as any).value);
        this.setState({ priceMultiplier: newMultiplier });
    };

    changePriceDecrease = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDecrease = Number(event.target.value);
        this.setState({ priceDecrease: newDecrease });
    };

    changeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = Number(event.target.value);
        this.setState({ maxPrice: newMaxPrice });
    };

    toggleAutoSearch = () => {
        const autoSearchState = !this.state.shouldAutoSearch;
        this.setState({ shouldAutoSearch: autoSearchState });
        u.notify(`AutoSearch toggled to ${autoSearchState.toString()}`);
    };

    checkPlayerFound = () => {
        return new Promise((resolve, reject) => {
            function checkColors() {
                const modifySearchButtonColor = u.getPixelColor(inputs.modifySearchButton);
                if (modifySearchButtonColor === inputs.modifySearchButton.color) {
                    return resolve(false);
                }

                const firstPlayerCardColor = u.getPixelColor(inputs.firstPlayerCard);
                if (firstPlayerCardColor === inputs.firstPlayerCard.color) {
                    return resolve(true);
                }

                setTimeout(checkColors, 30);
            }

            checkColors();
        });
    };

    searchHandler = async () => {
        let { players, priceIncrease, currentPlayerIndex, maxPrice } = this.state;

        if (players.length === 0) {
            u.log('No players in DB');
            return;
        }

        if (currentPlayerIndex >= players.length) {
            players = u.randomSort(players);
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
        const numericPrice = Number(currentPlayer.price);
        const priceWithDiscount = numericPrice * this.state.priceMultiplier;
        const discount = numericPrice - priceWithDiscount;
        const actualDiscount = discount < 1000 ? numericPrice / 2 : discount;
        const price = numericPrice - actualDiscount + priceIncreaseNumber;
        const priceString = String(Math.min(maxPrice, price).toFixed(0));

        console.log(`Checking player "${currentPlayer.name}" with minPrice = ${priceString}`);

        try {
            await u.delay(microDelay);
            u.moveAndClick(inputs.clearPlayerInput);
            await u.delay(microDelay);
            u.moveAndClick(inputs.playerInput);
            await u.delay(microDelay);
            u.typeString(currentPlayer.name);
            await u.waitForColor(inputs.searchPlayerCard.color, inputs.searchPlayerCard);
            const playerNotFoundIconColor = u.getPixelColor(inputs.playerNotFoundIcon);
            if (playerNotFoundIconColor === inputs.playerNotFoundIcon.color) {
                if (this.state.shouldAutoSearch) {
                    setTimeout(() => {
                        if (this.state.shouldAutoSearch) {
                            this.searchHandler();
                        }
                    }, 100);
                    throw Error(`Player ${currentPlayer.name} not found in the list`);
                }
            }
            u.moveAndClick(inputs.playerIcon);
            await u.delay(microDelay);
            u.moveAndClick(inputs.clearPriceInput);
            u.moveAndClick(inputs.priceInput);
            await u.delay(microDelay);
            u.typeString(priceString);
            u.moveAndClick(inputs.searchButton);
            const wasFound = await this.checkPlayerFound();
            if (wasFound) {
                u.notify(
                    `FOUND! ${currentPlayer.name} for less than ${priceString} gold`,
                    `
                    Player minimal price is ${currentPlayer.price} gold
                `
                );
            } else {
                u.log(`Not found! ${currentPlayer.name}`, `For less than ${priceString} gold`);
                u.moveAndClick(inputs.modifySearchButton);
                await u.waitForColor(inputs.searchButton.color, inputs.searchButton);
                if (this.state.shouldAutoSearch) {
                    this.searchHandler();
                }
            }
        } catch (error) {
            console.log(`Something went wrong.`, error);
        }
    };

    render() {
        const { shouldAutoSearch } = this.state;

        return (
            <div>
                <div style={{ position: 'fixed', background: '#eeeeee', top: 0, width: '100%' }}>
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
                        AutoSearch is {shouldAutoSearch ? 'on' : 'off'}
                    </button>
                    <div style={{ margin: '20px 0' }}>
                        <button type="button" onClick={this.reloadFromFutbin}>
                            Reload from futbin
                        </button>
                        <input
                            type="text"
                            placeholder="Futbin pages to load"
                            defaultValue={String(this.state.futbinPagesToLoad)}
                            onBlur={event => this.changeFutbinPages(event)}
                        />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <div>Price filter</div>
                        <input
                            type="text"
                            placeholder="price from"
                            defaultValue={String(this.state.priceFrom)}
                            onBlur={event => this.changeFilterFrom(event)}
                        />
                        <input
                            type="text"
                            placeholder="price to"
                            defaultValue={String(this.state.priceTo)}
                            onBlur={event => this.changeFilterTo(event)}
                        />
                        <div>Price multiplier</div>
                        <input
                            type="text"
                            placeholder="multiplier"
                            defaultValue={String(this.state.priceMultiplier)}
                            onBlur={event => this.changePriceMultiplier(event)}
                        />
                        <div>Price decrease</div>
                        <input
                            type="text"
                            placeholder="decrease"
                            value={this.state.priceDecrease}
                            onChange={event => this.changePriceDecrease(event)}
                        />
                        <div>Max price</div>
                        <input
                            type="text"
                            placeholder="max price"
                            value={this.state.maxPrice}
                            onChange={event => this.changeMaxPrice(event)}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: '280px' }}>
                    {this.state.players.map((player, index) => {
                        return (
                            <div
                                key={player.name}
                                style={{
                                    background: `${index === this.state.currentPlayerIndex ? 'tomato' : 'white'}`
                                }}
                            >
                                <input
                                    type="text"
                                    defaultValue={player.name}
                                    onBlur={event => this.changePlayerName(event, player)}
                                />
                                <input
                                    type="text"
                                    defaultValue={player.price}
                                    style={{ width: '80px' }}
                                    onBlur={event => this.changePlayerPrice(event, player)}
                                />
                                <input
                                    type="text"
                                    defaultValue={player.rating}
                                    style={{ width: '40px' }}
                                    onBlur={event => this.changePlayerRating(event, player)}
                                />
                                <button type="button" onClick={() => this.changeActiveIndex(index)}>
                                    Set active
                                </button>
                            </div>
                        );
                    })}
                    {this.state.players.length === 0 && <div>No players loaded.</div>}
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
