import React from 'react';
import Item from './Item.jsx';

export default class List extends React.Component {
  render() {
    return <ul>
						<Item text="Learn" />
						<Item text="Webpack" />
						<Item text="and" />
						<Item text="React" />
					 </ul>;
  }
}
