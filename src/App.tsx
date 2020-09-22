import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface IToDo {
  text: string,
  complete: boolean
}

interface IToDo2 extends IToDo {
  tags: string[]
}

function App(): JSX.Element {
  const sum = (a: number, b: number): number => a + b;
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<IToDo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value)
    setValue('');
  }

  const addTodo = (text: string): void => {
    const newTodos: IToDo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: IToDo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number): void => {
    const newTodos: IToDo[] = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
  }

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' required value={value} onChange={e => setValue(e.target.value)} />
        <button type='submit'>Add Todo</button>
      </form>
      <section>
        {todos.map((todo, index) => (
          <div key={index + 'todo'}>
            <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</div>
            <button type='button' onClick={(): void => completeTodo(index)}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
            <button type='button' onClick={()=>removeTodo(index)}>Remove</button>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
