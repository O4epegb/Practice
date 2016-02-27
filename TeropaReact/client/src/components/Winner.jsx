import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Winner extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render() {
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>;
  }
};
