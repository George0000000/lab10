import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [filter, setFilter] = useState('all');

    const addTodo = () => {
        if (task.trim() !== '') {
            setTodos([...todos, { task, completed: false, editing: false }]);
            setTask('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const toggleEdit = (index) => {
        const newTodos = [...todos];
        newTodos[index].editing = !newTodos[index].editing;
        setTodos(newTodos);
    };

    const saveTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].editing = false;
        setTodos(newTodos);
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <div>
                <label>Show:</label>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <ul>
                {todos
                    .filter((todo) => {
                        switch (filter) {
                            case 'active':
                                return !todo.completed;
                            case 'completed':
                                return todo.completed;
                            default:
                                return true;
                        }
                    })
                    .map((todo, index) => (
                        <li key={index} className={todo.completed ? 'completed' : ''}>
                            {todo.editing ? (
                                <>
                                    <input
                                        type="text"
                                        value={todo.task}
                                        onChange={(e) => {
                                            const newTodos = [...todos];
                                            newTodos[index].task = e.target.value;
                                            setTodos(newTodos);
                                        }}
                                    />
                                    <button onClick={() => saveTodo(index)}>Save</button>
                                </>
                            ) : (
                                <>
                  <span onClick={() => toggleTodo(index)}>
                    {todo.completed ? '✔' : '◻'} {todo.task}
                  </span>
                                    <button onClick={() => toggleEdit(index)}>Edit</button>
                                    <button onClick={() => removeTodo(index)}>Remove</button>
                                </>
                            )}
                        </li>
                    ))}
            </ul>
            <p>Total Todos: {todos.length}</p>
        </div>
    );
}

export default App;