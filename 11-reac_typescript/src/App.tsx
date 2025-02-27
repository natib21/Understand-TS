import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import Todos from "./todos";

const App: React.FC = () => {

  
  const [todos,setTodos] = useState<Todos[]>([])

  const todo = (text:string)=>{
   
    setTodos(prevTodo => [...prevTodo , {id:Math.random().toString(),text:text}]);

  }
  console.log(todos);
  return (
    <div className="App">
      <NewTodo onAddTod={todo}/>
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
