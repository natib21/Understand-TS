import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {

  const todoItems = [{id:"t1",title:"Learn React"}];
  return (
    <div className="App">
      <TodoList items={todoItems}/>
    </div>
  );
}

export default App;
