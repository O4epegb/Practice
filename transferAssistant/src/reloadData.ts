import axios from 'axios';
import * as cheerio from 'cheerio';
import { range, flatten, last, uniqBy } from 'lodash';

import { savePlayers } from './players';
import { PlayerType } from './models';

const formatters = {
    K: 1000,
    M: 1000000
};

const iconPageLimit = 4;

function getUrl(page = 1, playerType: PlayerType) {
    if (playerType === PlayerType.Gold) {
        return `https://www.futbin.com/18/players?page=${page}&version=gold_rare&sort=pc_price`;
    } else {
        return `https://www.futbin.com/18/players?page=${page}&version=icons`;
    }
}

function getPromises(totalPages: number, playerType: PlayerType) {
    return range(1, (playerType === PlayerType.Gold ? totalPages : iconPageLimit) + 1).map(i => {
        return axios.get(getUrl(i, playerType)).then(function(response) {
            const $ = cheerio.load(response.data);
            const tr = $('#repTb tbody > tr');
            const players = tr.toArray().map(el => {
                const tr = $(el);
                const url = 'https://www.futbin.com' + encodeURI(tr.attr('data-url'));
                const splittedUrl = decodeURI(tr.find('.player_name_players_table').attr('href')).split('/');
                const name = last(splittedUrl);
                const id = splittedUrl[splittedUrl.length - 2];
                const rating = tr.find('.rating').text();
                const price = tr.find('.pc_color').text();

                return {
                    id,
                    name,
                    rating,
                    price,
                    url,
                    type: playerType
                };
            });

            return players;
        });
    });
}

export function reloadFutbinData(totalPages = 10, playerType: PlayerType) {
    return Promise.all(getPromises(totalPages, playerType)).then(data => {
        const players = flatten(data).map(player => {
            const { price } = player;

            const formatter = /(K|M)/.exec(price);
            const numericPrice = parseFloat(price);
            const formattedPrice = formatter ? formatters[formatter[0]] * numericPrice : numericPrice;
            player.price = String(formattedPrice);

            return player;
        });

        return savePlayers(uniqBy(players, player => player.id));
    });
}
