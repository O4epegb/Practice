import * as React from 'react';
import { compiler, Tokens, AST, SvgAST } from '../compiler';


interface State {
    dnbSourceCode?: string;
    tokenizedCode?: Tokens;
    parsedCode?: AST;
    transformedCode?: SvgAST;
    generatedSvgCode?: string;
    errorText?: string;
}

export class App extends React.Component<{}, State> {
    constructor() {
        super();
        const defaultDnbSource = `
                    Paper 100
                    Pen 0
                    Line 50 15 85 80
                    Line 85 80 15 80
                    Line 15 80 50 15`;
        this.state = {
            dnbSourceCode: defaultDnbSource,
            ...this.getCompiledParts(defaultDnbSource)
        };
    }

    componentDidMount() {
    }

    getCompiledParts = (dnbCodeString: string) => {
        const tokenizedCode = compiler.tokenizer(dnbCodeString);
        const parsedCode = compiler.parser(tokenizedCode);
        const transformedCode = compiler.transformer(parsedCode);
        const generatedSvgCode = compiler.generator(transformedCode);
        return {
            tokenizedCode,
            parsedCode,
            transformedCode,
            generatedSvgCode
        };
    }

    compile = (dnbCodeString: string) => {
        try {
            const compiledParts = this.getCompiledParts(dnbCodeString);
            // linter does not work with spread operator just yet, so we cant spread here and make one call to setState
            this.setState(compiledParts);
            this.setState({ errorText: '' });
        } catch (e) {
            console.log('error kek', e);
            this.setState({ errorText: e });
        }
    }

    onCodeChange = (dnbCodeString: string) => {
        this.setState({ dnbSourceCode: dnbCodeString });
        this.compile(dnbCodeString);
    }

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.generatedSvgCode }} />
                <div>
                    <textarea value={this.state.dnbSourceCode} onChange={(e) => this.onCodeChange((e.target as any).value)} />
                    {this.state.errorText ?
                        <div>
                            {this.state.errorText}
                        </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}
