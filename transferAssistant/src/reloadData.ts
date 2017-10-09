import axios from 'axios';
import * as cheerio from 'cheerio';
import { range, flatten, last, uniqBy } from 'lodash';

import { savePlayers } from './players';

const formatters = {
    K: 1000,
    M: 1000000
};

function getUrl(page = 1) {
    return `https://www.futbin.com/18/players?page=${page}&version=gold_rare&sort=pc_price`;
}

function getPromises(totalPages: number) {
    return range(1, totalPages + 1).map(i => {
        return axios.get(getUrl(i)).then(function(response) {
            const $ = cheerio.load(response.data);
            const tr = $('#repTb tbody > tr');
            const players = tr.toArray().map(el => {
                const tr = $(el);
                const url = 'https://www.futbin.com' + encodeURI(tr.attr('data-url'));
                const name = last(decodeURI(tr.find('.player_name_players_table').attr('href')).split('/'));
                const rating = tr.find('.rating').text();
                const price = tr.find('.pc_color').text();

                return {
                    name,
                    rating,
                    price,
                    url
                };
            });

            return players;
        });
    });
}

export function reloadFutbinData(totalPages = 10) {
    return Promise.all(getPromises(totalPages)).then(data => {
        const players = flatten(data).map(player => {
            const { price } = player;

            const formatter = /(K|M)/.exec(price);
            const numericPrice = parseFloat(price);
            const formattedPrice = formatter ? formatters[formatter[0]] * numericPrice : numericPrice;
            player.price = String(formattedPrice);

            return player;
        });

        return savePlayers(uniqBy(players, player => player.url));
    });
}
