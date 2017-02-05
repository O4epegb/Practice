// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import * as ReactDom from 'react-dom';
// import { App } from './components/App';

// import './styles';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                keks
            </div>
        );
    }
}

function main() {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    ReactDom.render(<App />, container);
}

main();
