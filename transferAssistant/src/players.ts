import * as fs from 'fs';
import * as csvparser from 'csv-parse';
import { Player } from './models';

export function getPlayers() {
    return new Promise<Array<Player>>((resolve, reject) => {
        const playersString = fs.readFileSync('players.csv').toString();
        csvparser(playersString, { columns: true }, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject();
            }
        });
    });
}
