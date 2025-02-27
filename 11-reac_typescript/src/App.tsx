import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import Todos from "./todos";

const App: React.FC = () => {

  
  const [todos,setTodos] = useState<Todos[]>([])

  const todo = (text:string)=>{
    setTodos(prevTodo =>
       [...prevTodo , {id:Math.random().toString(),text:text}]
      );
  }
  const deleteTodos = (todoId:string)=>{
    setTodos(prevTodods => {
      return prevTodods.filter(todo => todo.id !== todoId);
    })
  }
  return (
    <div className="App">
      <NewTodo onAddTod={todo}/>
      <TodoList items={todos} onDeleteTodo={deleteTodos}/>
    </div>
  );
}

export default App;
