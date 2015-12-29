import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';
import BoardSquare from './Boardsquare';
import { canMoveKnight, moveKnight } from './Game';

export default class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x}
                   y={y}>
        {this.renderPiece(x, y)}
      </BoardSquare>
    </div>
  );
}

renderPiece(x, y) {
  const [knightX, knightY] = this.props.knightPosition;
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

  handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}
