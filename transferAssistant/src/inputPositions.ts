import { Coord } from './models';


interface Inputs {
    playerInput: Coord;
    playerIcon: Coord;
    priceInput: Coord;
    searchButton: Coord;
    popupCenterAndLeftButtons: Coord;
    clearPlayerInput: Coord;
    increaseBuyNowMinPrice: Coord;
    firstPlayerCard: Coord;
    buyNowButton: Coord;
    backButton: Coord;
}

export const inputs: Inputs = {
    playerInput: {
        x: 502,
        y: 439
    },
    playerIcon: {
        x: 502,
        y: 469
    },
    priceInput: {
        x: 614,
        y: 677
    },
    searchButton: {
        x: 609,
        y: 744
    },
    popupCenterAndLeftButtons: {
        x: 815,
        y: 573
    },
    clearPlayerInput: {
        x: 642,
        y: 439
    },
    increaseBuyNowMinPrice: {
        x: 683,
        y: 638
    },
    firstPlayerCard: {
        x: 426,
        y: 638
    },
    buyNowButton: {
        x: 1105,
        y: 467
    },
    backButton: {
        x: 520,
        y: 550
    }
};
