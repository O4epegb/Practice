import { Tokens } from './tokenizer';


export function parser(tokens: Tokens): AST {
    const AST = {
        type: 'Drawing',
        body: []
    } as AST;

    // extract a token at a time as current_token. Loop until we are out of tokens.
    while (tokens.length > 0) {
        const current_token = tokens.shift();

        // Since number token does not do anything by it self,
        // we only analyze syntax when we find a word.
        if (current_token.type === 'word') {
            switch (current_token.value) {
                case 'Paper':
                    var expression = {
                        type: 'CallExpression',
                        name: 'Paper',
                        arguments: []
                    };
                    // if current token is CallExpression of type Paper,
                    // next token should be color argument
                    var argument = tokens.shift();
                    if (argument.type === 'number') {
                        // add argument information to expression object
                        expression.arguments.push({
                            type: 'NumberLiteral',
                            value: argument.value
                        });
                        // push the expression object to body of our AST
                        AST.body.push(expression);
                    } else {
                        throw 'Paper command must be followed by a number.';
                    }
                    break;

                case 'Pen':
                    var expression = {
                        type: 'CallExpression',
                        name: 'Pen',
                        arguments: []
                    };
                    // if current token is CallExpression of type Pen,
                    // next token should be color argument
                    var argument = tokens.shift();
                    if (argument.type === 'number') {
                        // add argument information to expression object
                        expression.arguments.push({
                            type: 'NumberLiteral',
                            value: argument.value
                        });
                        // push the expression object to body of our AST
                        AST.body.push(expression);
                    } else {
                        throw 'Pen command must be followed by a number.';
                    }
                    break;

                case 'Line':
                    var expression = {
                        type: 'CallExpression',
                        name: 'Line',
                        arguments: []
                    };
                    // if current token is CallExpression of type Line,
                    // next 4 tokens should be position arguments
                    for (var i = 0; i < 4; i++) {
                        var argument = tokens.shift();
                        if (argument.type === 'number') {
                            // add argument information to expression object
                            expression.arguments.push({
                                type: 'NumberLiteral',
                                value: argument.value
                            });
                        } else {
                            throw 'Line command must be followed by 4 numbers.';
                        }
                    }
                    // push the expression object to body of our AST
                    AST.body.push(expression);
                    break;
            }
        }
    }
    return AST;
}

interface AST {
    type: 'Drawing';
    body: Array<any>;
}
