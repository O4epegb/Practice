// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Main } from './components/App';

import '../node_modules/normalize-css/normalize.css';
import './styles';


function main() {
    const container = document.createElement('div');
    container.style.height = '100%';
    document.body.appendChild(container);

    ReactDom.render(<Main />, container);
}

main();
