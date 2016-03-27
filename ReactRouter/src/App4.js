import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

const Page = (props) =>
  <div><h1>{props.location.query.message || 'Default Message, try ?message={message}'}</h1><Links /></div>

const Links = () =>
  <nav>
    <Link to={{pathname: "/", query: {message: 'Yo'}}}>Yo</Link>
    <Link to={{pathname: "/", query: {message: 'Hey'}}}>Hey</Link>
    <Link to={{pathname: "/", query: {message: 'Wtf'}}}>Wtf</Link>
  </nav>

export default class App extends React.Component {
    render() {
      return (
        <Router history={hashHistory}>
          <Route path="/" component={Page}></Route>
        </Router>
      )
    }
}
