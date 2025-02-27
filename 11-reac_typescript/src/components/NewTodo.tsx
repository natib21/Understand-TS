import React from "react";
import { useRef } from "react";

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
            <label htmlFor="text">Todo Text: </label>
            <input type="text" id="text" ref={inputRef}/>
            <button type="submit">Add Todo</button>
        </form>
    )
}
export default NewTodo;