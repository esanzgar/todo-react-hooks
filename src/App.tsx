import React, {useState, useRef, KeyboardEvent} from 'react';

// import v5 from 'uuid/v5';

import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [todos, setTodos] = useState([
    {
      content: 'Pickup dry cleaning',
      isCompleted: true,
    },
    {
      content: 'Get haircut',
      isCompleted: false,
    },
    {
      content: 'Build a todo app in React',
      isCompleted: false,
    },
  ]);

  const handleChange = (value: string, index: number) => {
    const newTodos = [...todos];
    newTodos[index].content = value;
    setTodos(newTodos);
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Enter') {
      createTodoAtIndex(index + 1);
    }

    if (event.key === 'Backspace' && todos[index].content === '') {
      event.preventDefault();
      deleteTodoAtIndex(index);
    }
  };

  const createTodoAtIndex = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 0, {content: '', isCompleted: false});
    setTodos(newTodos);
    window.setTimeout(() => {
      formRef.current && (formRef.current.elements[index] as HTMLInputElement).focus();
    }, 0);
  };

  const deleteTodoAtIndex = (index: number) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
  };

  const toggleDone = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const allTodos = todos.map((todo, index) => (
    <div
      className={`todo ${todo.isCompleted && 'todo-is-completed'}`}
      key={index}>
      <div className="checkbox" onClick={() => toggleDone(index)} />
      <input
        type="text"
        value={todo.content}
        onChange={event => handleChange(event.target.value, index)}
        onKeyDown={event => handleKeyDown(event, index)}
      />
    </div>
  ));

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list" ref={formRef}>
        <ul>{allTodos}</ul>
      </form>
    </div>
  );
};

export default App;
