import * as React from 'react';
import { observable, action, useStrict, toJS } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';


useStrict(true);

interface Store {
    todos: Array<Todo>;
}

interface Todo {
    id: number;
    name: string;
    done: boolean;
}

interface Colors {
    red: string;
}

const store = observable<Store>({
    todos: [
        {
            id: Math.random(),
            name: 'keke',
            done: false
        }
    ]
});

const addTodo = action(function addTodo(todo: Todo) {
    store.todos.push(todo);
});

const toggleTodo = action(function toggleTodo(targetTodo: Todo) {
    store.todos = store.todos.map(todo => {
        if (targetTodo === todo) {
            todo.done = !todo.done;
        }
        return todo;
    });
});

const Todo = inject((allStores) => ({
    colors: allStores.colors
}))(observer(({ toggleTodo, todo, colors }: { toggleTodo: (todo: Todo) => void, todo: Todo, colors?: Colors }) => {
    return (
        <li onClick={() => toggleTodo(todo)}
            style={{
                'textDecoration': todo.done
                    ? 'line-through'
                    : 'none',
                'color': todo.done ? colors!.red : 'inherit'
            }}>
            {todo.name}
        </li>
    );
}));

interface AppState {
    text?: string;
}

interface AppProps {
    store?: Store;
}

interface InjectedAppProps {
    store: Store;
}

@inject((allStores) => ({
    store: allStores.store
}))
@observer
class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            text: ''
        };
    }

    get injected() {
        return this.props as InjectedAppProps;
      }

    toggleTodo = (todo: Todo) => {
        toggleTodo(todo);
    }

    addTodo = () => {
        addTodo({
            id: Math.random(),
            name: this.state.text || 'untitled',
            done: false
        });
        this.setState({ text: '' });
    }

    render() {
        console.log(toJS(this.injected.store.todos));
        return (
            <div>
                <button onClick={this.addTodo}>
                    Add todo
                </button>
                <input type="text" value={this.state.text} onChange={(e: any) => {
                    this.setState({ text: e.target.value });
                }} />
                <ul>
                    {this.props.store!.todos.map((todo: Todo) => <Todo key={todo.id} toggleTodo={this.toggleTodo} todo={todo} />)}
                </ul>
            </div>
        );
    }
};

export const Main = () =>
    <Provider store={store} colors={{ red: 'tomato' }}>
        <App />
    </Provider>;
