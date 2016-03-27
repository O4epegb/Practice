import React from 'react';
import { Router, Route, Redirect, Link, IndexRoute, hashHistory } from 'react-router';

const Outer = (props) => <div><h1>Our Site</h1><Links />{props.children}</div>
const Index = () => <div><h1>Index</h1></div>
const About = (props) => <div><h1>About</h1>{props.children}</div>
const InnerRoute = () => <div><h1>Inner Route</h1></div>
const Contact = () => <div><h1>Contact</h1></div>
const Message = (props) => <div><h1>{props.params.test || 'default message, try /messages/{message}'}</h1></div>

const Links = () =>
  <nav>
    <Link activeStyle={{color: 'green'}} to="/">Home</Link>
    <Link activeStyle={{color: 'green'}} to="About">About</Link>
    <Link activeClassName="active" to="About-us">About Us (redirected)</Link>
    <Link activeClassName="active" to="/About/Inner">Inner</Link>
    <Link activeClassName="active" to="Contact">Contact</Link>
    <Link activeClassName="active" to="Messages">Message</Link>
  </nav>

export default class App extends React.Component {
    render() {
      return (
        <Router history={hashHistory}>
          <Route path="/" component={Outer}>
            <IndexRoute component={Index}></IndexRoute>
            <Route path="about" component={About}>
              <Route path="inner" component={InnerRoute}></Route>
            </Route>
            <Route path="contact" component={Contact}></Route>
            <Route path="messages(/:test)" component={Message}></Route>
            <Redirect from="/about-us" to="about"></Redirect>
          </Route>
        </Router>
      )
    }
}
