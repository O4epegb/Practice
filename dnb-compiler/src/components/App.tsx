import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
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
                    Line 15 80 50 15`.split('\n').filter(Boolean).map(i => i.trim()).join('\n');
        this.state = {
            dnbSourceCode: defaultDnbSource,
            ...this.getCompiledParts(defaultDnbSource)
        };
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
            this.setState({ errorText: e });
        }
    }

    onCodeChange = (dnbCodeString: string) => {
        this.setState({ dnbSourceCode: dnbCodeString });
        this.compile(dnbCodeString);
    }

    render() {
        const compilerSources = [{
            title: 'Tokens',
            value: this.state.tokenizedCode
        }, {
            title: 'Parsed AST',
            value: this.state.parsedCode
        }, {
            title: 'Transformed AST',
            value: this.state.transformedCode
        }, {
            title: 'Generated SVG code',
            value: this.state.generatedSvgCode
        }];

        return (
            <div className="wrapper">
                <div className="header">
                    <h1 className="header__title">Design By Numbers language compiler</h1>
                </div>
                <div className="preview">
                    <div className="preview__svg" dangerouslySetInnerHTML={{ __html: this.state.generatedSvgCode }} />
                    <CodeMirror className="preview__editor" value={this.state.dnbSourceCode} onChange={this.onCodeChange} options={{ lineNumbers: true }} />
                </div>
                {this.state.errorText ?
                    <div className="message message_error">
                        {this.state.errorText}
                    </div>
                    : <div className="message">
                        Compiled successfully!
                    </div>
                }
                <div className="compiler-code">
                    {compilerSources.map((item) => (
                        <div key={item.title} className="compiler-code__item">
                            <div className="compiler-code__item-title">
                                {item.title}
                            </div>
                            <CodeMirror className="compiler-code__item-editor"
                                value={typeof item.value === 'string' ? item.value : JSON.stringify(item.value, null, 2)}
                                options={{ lineNumbers: true, readOnly: true }} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
