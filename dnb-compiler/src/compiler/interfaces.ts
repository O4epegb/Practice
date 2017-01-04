export type Tokens = Array<WordToken | NumberToken>;

export interface WordToken {
    type: 'word';
    value: string;
}

export interface NumberToken {
    type: 'number';
    value: number;
}

export interface AST {
    type: 'Drawing';
    body: Array<ASTNode>;
}

export interface ASTNode {
    type: 'CallExpression';
    name: ASTNodeName;
    arguments: Array<NumberLiteral>;
}

export type ASTNodeName = 'Paper' | 'Pen' | 'Line';

export interface NumberLiteral {
    type: 'NumberLiteral';
    value: number;
}

export interface SvgAST {
    tag: 'svg';
    attr: {
        [key: string]: string | number
    };
    body: Array<SvgASTNode>;
}

export interface SvgASTNode {
    tag: 'rect' | 'line';
    attr: {
        [key: string]: string | number
    };
}
