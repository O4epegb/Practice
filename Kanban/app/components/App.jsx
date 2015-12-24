import React from 'react';
import Note from './Note.jsx';
import uuid from 'node-uuid';

const notes = [
  {
    id: uuid.v4(),
    task: 'Learn Webpack'
  },
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'Do laundry'
  }
];

export default class App extends React.Component {
  renderNote(note) {
    return (
      <li key={note.id}>
        <Note task={note.task} />
      </li>
    );
  }
  render() {
    return (
      <div>
        <ul>{notes.map(this.renderNote)}</ul>
      </div>
    );
  }
}
