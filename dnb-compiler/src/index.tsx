// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './components/App';

import '../node_modules/normalize-css/normalize.css';
import '../node_modules/codemirror/lib/codemirror.css';
import './styles';


function main() {
    const app = document.createElement('div');
    document.body.appendChild(app);

    ReactDom.render(<App />, app);
}

main();
