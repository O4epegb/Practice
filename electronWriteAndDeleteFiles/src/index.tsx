// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, Link } from 'react-router';
import { createHashHistory } from 'history';


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false } as any);

const App = () =>
    <Router history={appHistory}>
        <Route path="/" component={IndexPage} />
        <Route path="another-page" component={AnotherPage} />
    </Router>;


function IndexPage() {
    return (
        <div>
            <div>
                This is index page
            </div>
            <Link to={'another-page/'}>To Page 2</Link>
        </div>
    );
}

function AnotherPage() {
    return (
        <div>
            <div>
                This is another page
            </div>
            <Link to={'/'}>To index</Link>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
