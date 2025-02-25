 import { Project, ProjectStatus } from "../models/project";

 
 type Listners<T> = (item:T[]) => void;

 class State<T> {
    protected listeners :Listners<T>[] = [];

    addListner(Listner: Listners<T>){
        this.listeners.push(Listner);
      } 
} 
 


export class ProjectStateMgmg extends State<Project> {
  
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
    moveProject(projectId:string,newStatus:ProjectStatus){
        const project = this.projects.find(prj => prj.id === projectId)
        if(project && project.status !== newStatus){   
            project.status = newStatus;
            projectState.updateListners()
        }
    }

    private updateListners(){
       for (const listnerFn of this.listeners){
           listnerFn(this.projects.slice());
       }
    }
   

}

export const projectState = ProjectStateMgmg.getInstance();
