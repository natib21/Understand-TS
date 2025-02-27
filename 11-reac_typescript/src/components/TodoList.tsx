import React from "react";
import Todos from "../todos";
interface TodoListProps{
    items: Todos[];
}

const TodoList:React.FC<TodoListProps> = props=>{
    return (
       <ul>
          {props.items.map(todo=>(
              <li key={todo.id}>{todo.text}</li>
          ))}
       </ul>
    )
}

export default TodoList;