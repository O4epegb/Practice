import { Player } from './models';
import { playersData } from './players-data';


export const players: Array<Player> = Object.keys(playersData).map((name) => {
    const playerInfo = playersData[name];
    if (playerInfo.length === 0) {
        return;
    }
    const [shortPrice, alias] = playerInfo.split('/');
    const price = String((parseFloat(shortPrice) || 0) * 1000);

    return {
        name,
        alias,
        price
    };
}).filter(Boolean);
