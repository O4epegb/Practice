import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, action, useStrict} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

useStrict(true);

const store = observable({
    todos: [
        {
            name: 'keke',
            done: false
        }
    ]
})

const addTodo = action(function(store, todo) {
    store.todos.push(todo);
})

const toggleTodo = action(function(store, targetTodo) {
    store.todos = store.todos.map(todo => {
      if (targetTodo === todo) {
        todo.done = !todo.done;
      }
      return todo;
    })
})

@observer
class TimerView extends Component {
    state = {
        text: ''
    }

    render() {
        return (
            <div>
                <button onClick={this.addTodo}>
                    add
                </button>
                <input type="text" value={this.state.text} onChange={(e) => {
                    this.setState({text: e.target.value})
                }}/>
                {this.props.store.todos.map(todo =>
                  <div onClick={() => this.toggleTodo(todo)}
                       style={{'text-decoration': todo.done ? 'line-through' : 'none'}}>
                    {todo.name}
                  </div>
                )}
                <DevTools/>
            </div>
        );
    }

    toggleTodo = (todo) => {
      toggleTodo(this.props.store, todo);
    }

    addTodo = () => {
        addTodo(this.props.store, {
            name: this.state.text || 'untitled',
            done: false
        });
        this.setState({text: ''})
    }
};

ReactDOM.render(
    <TimerView store={store}/>, document.getElementById('root'));
