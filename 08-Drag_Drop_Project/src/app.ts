
interface Dragaable{
    dragStartHandler(event: DragEvent):void;
    dragEndHandler(event: DragEvent):void;
} 
interface DragTarget{
    dragOverHandler(event: DragEvent):void;
    dropHandler(event: DragEvent):void;
    dragLeaveHandler(event: DragEvent):void;
}

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

type Listners<T> = (item:Project[]) => void;

class State<T> {
    protected listeners :Listners<T>[] = [];

    addListner(Listner: Listners<T>){
        this.listeners.push(Listner);
      }
} 
 

 class ProjectStateMgmg extends State<Project> {
  
     private projects :Project [] = [];
     private static instance:ProjectStateMgmg;
     
     private constructor(){
     super()
     }
 static getInstance(){
    if(this.instance){
        return this.instance
    }
    this.instance = new ProjectStateMgmg()
    return this.instance;
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

abstract class Component<T extends HTMLElement,U extends HTMLElement > {
    templateElement:HTMLTemplateElement;
    hostElement:T;
    element:U;
    

    constructor(templateId:string,hostElementId:string,newElementId:string,insertAtStart:boolean){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
        this.hostElement = document.getElementById(hostElementId)! as T
        const importedNode = document.importNode(this.templateElement.content,true)
        this.element = importedNode.firstElementChild as U
        if(newElementId){
            this.element.id = newElementId
        }
        this.attach(insertAtStart) ;  
    }

    private attach(insertAtStart: boolean){
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin':'beforeend',this.element)
    }

    abstract configure():void;
    abstract renderContent():void;
}



class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{
   
    assignedProjects:Project [] = [];

    constructor(private type: 'active'|'finished'){
        super('project-list','app', `${type}-projects`,false)
          this.configure()    
          this.renderContent()
        }
        
      
        private renderProjects(){
          const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement 
          listEl.innerHTML ="";
          for (const prjItem of this.assignedProjects){
           new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
          }
        }
        @autobind
        dragLeaveHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')! as HTMLUListElement;
            listEl.classList.remove('droppable')
        }
        @autobind
        dragOverHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')! as HTMLUListElement;
            listEl.classList.add('droppable')
        }
        dropHandler(_: DragEvent): void {
            
        }
         configure(){

            this.element.addEventListener('dragover',this.dragOverHandler)
            this.element.addEventListener('dragleave',this.dragLeaveHandler)
            this.element.addEventListener('drop',this.dropHandler)
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
         }
         renderContent(){
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        }
}


class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Dragaable{
    private projects :Project;

    get persons(){
        if(this.projects.numberOfPeople === 1){
            return '1 person'
        }else{
            return `${this.projects.numberOfPeople} persons`
        } 
    }

    constructor(hostId:string,project:Project){
 super('single-project',hostId,project.id,false);
 this.projects = project;
 this.configure()
 this.renderContent()
    }
    @autobind
 dragStartHandler(event: DragEvent): void {
    console.log(event);
    
}
dragEndHandler(_: DragEvent): void {
    console.log('DragEnd')
}
    configure() {
         this.element.addEventListener('dragstart',this.dragStartHandler)
         this.element.addEventListener('dragend',this.dragEndHandler)
    }
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.projects.title;
        this.element.querySelector(
            'h3'
        )!.textContent = this.persons + ' Assinged';
        this.element.querySelector('p')!.textContent = this.projects.description;
    }
}

class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {

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


const project  = new ProjectInput();
const activeProjectLst = new ProjectList('active');
const finshedProjectLst = new ProjectList('finished');

/// Lecture 123