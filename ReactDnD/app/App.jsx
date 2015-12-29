import React, { Component } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends Component {
  render() {
    const knightPosition = this.props.knightPosition;
    return <Board knightPosition={knightPosition}>

          </Board>;
  }
}
