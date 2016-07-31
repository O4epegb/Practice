import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, action, useStrict} from 'mobx';
import {observer, Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

useStrict(true);

const store = observable({
    todos: [
        {
            id: Math.random(),
            name: 'keke',
            done: false
        }
    ]
})

const addTodo = action(function addTodo(todo) {
    store.todos.push(todo);
})

const toggleTodo = action(function toggleTodo(targetTodo) {
    store.todos = store.todos.map(todo => {
        if (targetTodo === todo) {
            todo.done = !todo.done;
        }
        return todo;
    })
})

const Todo = observer(({toggleTodo, todo}) => {
    return (
        <li onClick={() => toggleTodo(todo)} style={{
            'textDecoration': todo.done
                ? 'line-through'
                : 'none'
        }}>
            {todo.name}
        </li>
    );
});

@observer(['store'])
class App extends Component {
    state = {
        text: ''
    }

    toggleTodo = (todo) => {
        toggleTodo(todo);
    }

    addTodo = () => {
        addTodo({
            id: Math.random(),
            name: this.state.text || 'untitled',
            done: false
        });
        this.setState({text: ''})
    }

    render() {
        return (
            <div>
                <button onClick={this.addTodo}>
                    Add todo
                </button>
                <input type="text" value={this.state.text} onChange={(e) => {
                    this.setState({text: e.target.value})
                }}/>
                <ul>
                    {this.props.store.todos.map(todo => <Todo key={todo.id} toggleTodo={this.toggleTodo} todo={todo}/>)}
                </ul>
                <DevTools/>
            </div>
        );
    }
};

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
