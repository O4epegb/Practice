import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';

export class Voting extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
};

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}

export const VotingContainer =  connect(mapStateToProps)(Voting);
