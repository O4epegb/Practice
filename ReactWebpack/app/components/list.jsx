import React from 'react';
import Item from './Item.jsx';
import map from 'lodash/map';

const words = ['Hey', 'Learn', 'React'];
const stuff = {
  'wtf': 'omg'
}
const stuff2 = {
  'kek': 'lol'
}

const stuffSum = {...stuff, ...stuff2};

export default class List extends React.Component {
  render() {
    return <ul>
            {map(words, (word) => {
            return <Item text={word} />
            })}
            {stuffSum.kek}
            {stuffSum.wtf}
					 </ul>;
  }
}
