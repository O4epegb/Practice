import { Tokens } from './interfaces';


// export function tokenizer(code: string): Tokens {
//     return code.split(/\s+/)
//         .filter(t => t.length > 0)
//         .map(t => isNaN(Number(t))
//             ? { type: 'word', value: t } as WordToken
//             : { type: 'number', value: Number(t) } as NumberToken);
// }

export function tokenizer(input: string): Tokens {
    let current = 0;

    const tokens: Tokens = [];

    while (current < input.length) {
        let char = input[current];

        const WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        const NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {

            let value = '';

            while (char != undefined && NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'number', value: Number(value) });

            continue;
        }

        const LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';

            while (char != undefined && LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'word', value });

            continue;
        }

        throw new TypeError(`I dont know what this character is: ${char}`);
    }

    return tokens;
}
