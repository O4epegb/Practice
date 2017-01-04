import * as I from './interfaces';


export function parser(tokens: I.Tokens): I.AST {
    const AST = {
        type: 'Drawing',
        body: []
    } as I.AST;

    // extract a token at a time as current_token. Loop until we are out of tokens.
    while (tokens.length > 0) {
        const current_token = tokens.shift();

        // Since number token does not do anything by it self,
        // we only analyze syntax when we find a word.
        if (current_token.type === 'word') {
            switch (current_token.value) {
                case 'Paper':
                    var expression = getCallExpression('Paper');
                    // if current token is CallExpression of type Paper,
                    // next token should be color argument
                    var argument = tokens.shift();
                    if (argument.type === 'number') {
                        // add argument information to expression object
                        expression.arguments.push(getNumberLiteral(argument.value));
                        // push the expression object to body of our AST
                        AST.body.push(expression);
                    } else {
                        throw 'Paper command must be followed by a number.';
                    }
                    break;

                case 'Pen':
                    var expression = getCallExpression('Pen');
                    // if current token is CallExpression of type Pen,
                    // next token should be color argument
                    var argument = tokens.shift();
                    if (argument.type === 'number') {
                        // add argument information to expression object
                        expression.arguments.push(getNumberLiteral(argument.value));
                        // push the expression object to body of our AST
                        AST.body.push(expression);
                    } else {
                        throw 'Pen command must be followed by a number.';
                    }
                    break;

                case 'Line':
                    var expression = getCallExpression('Line');
                    // if current token is CallExpression of type Line,
                    // next 4 tokens should be position arguments
                    for (var i = 0; i < 4; i++) {
                        var argument = tokens.shift();
                        if (argument.type === 'number') {
                            // add argument information to expression object
                            expression.arguments.push(getNumberLiteral(argument.value));
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

function getCallExpression(name: I.ASTNodeName): I.ASTNode {
    return {
        type: 'CallExpression',
        name: name,
        arguments: []
    };
}

function getNumberLiteral(value: number): I.NumberLiteral {
    return {
        type: 'NumberLiteral',
        value
    };
}
