import React from "react";
import { useRef } from "react";
import './NewTodo.css';
interface NewTodoProps{
    onAddTod:(text:string)=>void;   
}

const NewTodo:React.FC<NewTodoProps> = (props)=>{

  const inputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event:React.FormEvent)=>{
    event.preventDefault();

    if (inputRef.current) {
        const enteredText = inputRef.current.value;
      props.onAddTod(enteredText);
      }
 
  }
    return (
        <form onSubmit={todoSubmitHandler}>
            <div className="form-control">

            <label htmlFor="todo-text">Todo Text: </label>
            <input type="text" id="text" ref={inputRef}/>
            </div>
            <button type="submit">Add Todo</button>
        </form>
    )
}
export default NewTodo;