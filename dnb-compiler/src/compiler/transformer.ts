import * as I from './interfaces';


export function transformer(ast: I.AST): I.SvgAST {
    var svg_ast = {
        tag: 'svg',
        attr: {
            viewBox: '0 0 100 100',
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1'
        },
        body: []
    } as I.SvgAST;

    let pen_color = 100; // default pen color is black

    const astBody = ast.body.slice();
    // Extract a call expression at a time as `node`.
    // Loop until we are out of expressions in body.
    while (astBody.length > 0) {
        const node = astBody.shift();
        switch (node.name) {
            case 'Paper':
                var paper_color = 100 - node.arguments[0].value;
                // add rect element information to svg_ast's body
                svg_ast.body.push({
                    tag: 'rect',
                    attr: {
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        fill: 'rgb(' + paper_color + '%,' + paper_color + '%,' + paper_color + '%)'
                    }
                });
                break;
            case 'Pen':
                // keep current pen color in `pen_color` variable
                pen_color = 100 - node.arguments[0].value;
                break;
            case 'Line':
                // add line element information to svg_ast's body
                svg_ast.body.push({
                    tag: 'line',
                    attr: {
                        x1: node.arguments[0].value,
                        y1: node.arguments[1].value,
                        x2: node.arguments[2].value,
                        y2: node.arguments[3].value,
                        'stroke-linecap': 'round',
                        stroke: 'rgb(' + pen_color + '%,' + pen_color + '%,' + pen_color + '%)'
                    }
                });
                break;
        }
    }

    return svg_ast;
}
