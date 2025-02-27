import React from "react";
import Todos from "../todos";
import './TodoList.css';
interface TodoListProps{
    items: Todos[];
    onDeleteTodo: (id:string)=>void;
}

const TodoList:React.FC<TodoListProps> = props=>{
    return (
       <ul>
          {props.items.map(todo=>(
              <li key={todo.id}>{todo.text}

              <button onClick={props.onDeleteTodo.bind(null,todo.id)}>Delete</button>
              </li>
            
          ))}
       </ul>
    )
}

export default TodoList;