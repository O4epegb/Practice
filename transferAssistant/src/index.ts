import { app/*, BrowserWindow*/ } from 'electron';
import * as utils from './utils';
import { registerShortcut, unregisterShortcut, unregisterAllShortcuts } from './shortcut';
import { shortcutNames } from './constants';
import { inputs } from './inputPositions';
import { players as allPlayers } from './players';


app.on('ready', () => {
    // var mainWindow = new BrowserWindow({
    //     width: 600,
    //     height: 300,
    //     center: true,
    //     title: "Electron Notification Example",
    // });
    // mainWindow.on('closed', function() {
    //     mainWindow = null;
    // });
    // mainWindow.loadURL(`file://${__dirname}/index.html`);

    let players = allPlayers.filter(player => Number(player.price) <= 10000).map(player => (player.price = String(Number(player.price) * 0.8), player));
    players = utils.randomSort(players);
    let lastPlayerPrice = '';
    let needToUpdateMinPrice = false;
    let playerCounter = 0;

    function searchHandler() {
        if (playerCounter >= players.length) {
            needToUpdateMinPrice = true;
            players = utils.randomSort(players);
            playerCounter = 0;
        } else {
            needToUpdateMinPrice = false;
        }
        const currentPlayer = players[playerCounter];
        ++playerCounter;

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
                if (lastPlayerPrice !== currentPlayer.price) {
                    lastPlayerPrice = currentPlayer.price;
                    utils.typeString(currentPlayer.price);
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

    registerShortcut(shortcutNames.three, searchHandler);
    registerShortcut(shortcutNames.two, () => {
        utils.moveAndClick(inputs.popupCenterAndLeftButtons);
    });
    registerShortcut(shortcutNames.one, () => {
        utils.moveAndClick(inputs.firstPlayerCard).then(() => {
            return utils.delay(500);
        }).then(() => {
            utils.moveAndClick(inputs.buyNowButton);
        });
    });
    registerShortcut(shortcutNames.four, () => {
        utils.moveAndClick(inputs.backButton);
    });
    registerShortcut(shortcutNames.five, () => {
        const coords = utils.getMouseCoords();
        console.log(utils.getPixelColor(coords));
    });
    registerShortcut(shortcutNames.six, () => {
        // utils.waitForColor('00ff00').then(() => {
        //     console.log('its here');
        // });
        const coords = utils.getMouseCoords();
        console.log(coords);
    });
});

app.on('will-quit', () => {
    Object.keys(shortcutNames).forEach(unregisterShortcut);
    unregisterAllShortcuts();
});
