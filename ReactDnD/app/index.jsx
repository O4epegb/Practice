import './main.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { observe } from './Game';

const app = document.createElement('div');
app.classList.add("wrapper");
document.body.appendChild(app);

observe(knightPosition =>
  ReactDOM.render(
    <App knightPosition={knightPosition} />,
    app
  )
);
