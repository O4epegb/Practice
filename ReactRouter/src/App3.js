import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

const Home = () => <div><h1>Home</h1></div>
const HomeBody = () => <div><h1>Home Body</h1></div>
const Other = () => <div><h1>Other</h1></div>
const OtherBody = () => <div><h1>Other Body</h1></div>
const Another = () => <div><h1>Another</h1></div>
const AnotherBody = () => <div><h1>Another Body</h1></div>

const Container = (props) =>
  <div>{props.header}{props.body}<Links /></div>

const Links = () =>
  <nav>
    <Link activeStyle={{color: 'green'}} to="/">Home</Link>
    <Link activeStyle={{color: 'green'}} to="/other">Other</Link>
    <Link activeStyle={{color: 'green'}} to="/Another">Another</Link>
  </nav>

export default class App extends React.Component {
    render() {
      return (
        <Router history={hashHistory}>
          <Route path="/" component={Container}>
            <IndexRoute components={{ header: Home, body: HomeBody}}></IndexRoute>
            <Route path="/other" components={{ header: Other, body: OtherBody}}></Route>
            <Route path="/another" components={{ header: Another, body: AnotherBody}}></Route>
          </Route>
        </Router>
      )
    }
}
