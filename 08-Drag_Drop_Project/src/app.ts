// Autobind Decorator 

function autobind(target:any,methodName:string,descriptor:PropertyDescriptor){
 const originalMethod = descriptor.value
//  console.log(originalMethod)
 const adjDescriptor: PropertyDescriptor = {
    configurable:true,
    get(){
        const boundFn = originalMethod.bind(this)
        return boundFn
    }
 }
 return adjDescriptor
}


class ProjectInput {

    templateElement : HTMLTemplateElement
    hostElement : HTMLDivElement
    element : HTMLFormElement
    titleInputElement : HTMLInputElement
    descriptionInputElement : HTMLInputElement
    peopleInputElement : HTMLInputElement

    constructor(){

        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content,true)
        this.element = importedNode.firstElementChild as HTMLFormElement
        this.element.id = 'user-input'
       
        this.titleInputElement = this.element.querySelector('#title')  as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')  as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people')  as HTMLInputElement
        this.configure()
        this.attach()
    
    }

    private gatherUserInputs():[string,string,number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value

        if(enteredTitle.trim().length === 0 || enteredDescription.trim().length ===0 || enteredPeople.trim().length === 0){
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
         this.clear()
     }
    }

    private configure(){
        this.element.addEventListener(
            'submit',this.submitHandler
        )
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
} 


const project  = new ProjectInput()

/// Lecture 123