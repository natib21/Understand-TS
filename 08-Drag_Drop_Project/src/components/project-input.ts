import { Component } from './base-component';
import { Validatable,validate } from '../utils/validation';
import { autobind } from '../decorator/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {

    titleInputElement : HTMLInputElement
    descriptionInputElement : HTMLInputElement
    peopleInputElement : HTMLInputElement

    constructor(){
        
        super('project-input','app','user-input',true );

        this.titleInputElement = this.element.querySelector('#title')  as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')  as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people')  as HTMLInputElement
        this.configure()
        
    
    }
   

    private gatherUserInputs():[string,string,number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value


        const titleValidatable: Validatable = {
            value: enteredTitle,
            required : true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required : true,
            minLength:5,
        }
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required : true,
            min:1,
            max:5
        }
        if(
        !validate(titleValidatable) || 
        !validate(descriptionValidatable) || 
        !validate(peopleValidatable)){
            alert("Invalid Input")
            return
        }else {
            return [enteredTitle,enteredDescription,+enteredPeople]
        }
    }

    private clear(){
        this.titleInputElement.value= " ";
        this.descriptionInputElement.value =" ";
        this.peopleInputElement.value = " ";
    }



    @autobind
    private submitHandler(event:Event){
     event.preventDefault()
     console.log(this.titleInputElement.value)
     const userInput = this.gatherUserInputs()
     if(Array.isArray(userInput)){
        const [title,desc,people] = userInput;
         console.log(title,desc,people)
         projectState.addProject(title,desc,people);
         this.clear()
     }
    }
    renderContent() {
    }
     configure(){
        this.element.addEventListener(
            'submit',this.submitHandler
        )
    }

   
} 