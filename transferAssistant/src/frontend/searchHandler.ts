import * as utils from '../utils';
import { inputs } from '../inputPositions';
import { Player } from '../models';


export function searchHandler(currentPlayer: Player, lastPlayerPrice: string, needToUpdateMinPrice: boolean) {
    console.log(`Checking player "${currentPlayer.name}" with minPrice = ${currentPlayer.price}`);

    return utils.delay(0)
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
            return utils.delay(500);
        }).then(() => {
            const color = utils.getPixelColor(inputs.searchNotFound);
            console.log(`checking color searchNotFound: found: ${color}, expected: ${inputs.searchNotFound.color}`);
            if (color === inputs.searchNotFound.color) {
                return false;
            } else {
                return true;
            }
        }).then((wasFound) => {
            if (wasFound) {
                utils.notify(`FOUND! ${currentPlayer.name}`, `For less than ${currentPlayer.price} gold`);
            } else {
                utils.notify(`Not found! ${currentPlayer.name}`, `For less than ${currentPlayer.price} gold`);
                utils.moveAndClick(inputs.popupCenterAndLeftButtons);
            }
        }).catch((err) => {
            console.log(`Something went wrong.`, err);
        });
}
