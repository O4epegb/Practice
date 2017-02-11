import * as fs from 'fs';
import * as csvparser from 'csv-parse';
import * as csvstringify from 'csv-stringify';
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

export function savePlayers(players: Array<Player>) {
    return new Promise<Array<Player>>((resolve, reject) => {
        const columns = Object.keys(players[0]);
        csvstringify(players as any, { header: true, columns } as any, (err, output) => {
            if (!err) {
                fs.writeFileSync('players.csv', output);
                resolve();
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
}
