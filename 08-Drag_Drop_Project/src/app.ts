// State Management
 enum ProjectStatus {Active,Finished}


class Project {

    constructor(
        public id:string,
        public title :string,
        public description:string,
        public numberOfPeople:number,
        public status: ProjectStatus
    ){}
}
type Listners = (item:Project[]) => void;

 
 class ProjectStateMgmg {
     private listeners :Listners[] = [];
     private projects :Project [] = [];
     private static instance:ProjectStateMgmg;
     
     private constructor(){

     }
 static getInstance(){
    if(this.instance){
        return this.instance
    }
    this.instance = new ProjectStateMgmg()
    return this.instance;
 }
 addListner(Listner: Listners){
    this.listeners.push(Listner);
  }
     addProject(title:string, description :string ,numberOfPeople:number){

        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        ) 
          
        this.projects.push(newProject);
        for (const listnerFn of this.listeners){
            listnerFn(this.projects.slice());
        }
     }
    

 }

 const projectState = ProjectStateMgmg.getInstance();
 

interface Validatable {
    value : string | number ;
    required? : boolean;
    minLength?:number;
    maxLength?:number;
    min?:number;
    max?:number;
}

function validate(validatableInput: Validatable){
    let isValid = true;
    if (validatableInput.required){
        if(typeof validatableInput.value === 'string'){
            isValid = isValid && validatableInput.value.trim().length !== 0
        }
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
     if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
     if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    // Check max for numbers
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid
}

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

class ProjectList {
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLElement;
    assignedProjects:Project [] = [];

    constructor(private type: 'active'|'finished'){
              this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement
              this.hostElement = document.getElementById('app')! as HTMLDivElement
              const importedNode = document.importNode(this.templateElement.content,true)
              this.element = importedNode.firstElementChild as HTMLElement
              this.element.id = `${this.type}-projects`
              projectState.addListner((projects: Project[])=>{
              
              const relavantProjects = projects.filter((item)=> {
                    if(this.type === 'active'){
                        return item.status === ProjectStatus.Active
                    }
                    return item.status === ProjectStatus.Finished;
                })

                this.assignedProjects = relavantProjects;
                this.renderProjects()
              });
              this.attach()   
              this.renderContent()
        }

        private attach(){
            this.hostElement.insertAdjacentElement('beforeend',this.element)
        }
        private renderProjects(){
          const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement 
          listEl.innerHTML ="";
          for (const prjItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
          }
        }

        private renderContent(){
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        }
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

    private configure(){
        this.element.addEventListener(
            'submit',this.submitHandler
        )
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
} 


const project  = new ProjectInput();
const activeProjectLst = new ProjectList('active');
const finshedProjectLst = new ProjectList('finished');

/// Lecture 123