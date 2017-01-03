export function tokenizer(code: string): Tokens {
    return code.split(/\s+/)
        .filter(t => t.length > 0)
        .map(t => isNaN(Number(t))
            ? { type: 'word', value: t } as WordToken
            : { type: 'number', value: Number(t) } as NumberToken);
}

export type Tokens = Array<WordToken | NumberToken>;

interface WordToken {
    type: 'word';
    value: string;
}

interface NumberToken {
    type: 'number';
    value: number;
}
