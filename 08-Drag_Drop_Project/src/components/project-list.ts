import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { Project,ProjectStatus } from '../models/project';
import { autobind } from '../decorator/autobind';
import { projectState } from '../state/project-state';
import { DragTarget } from '../models/drag-drop';



export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{
   
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
        dragOverHandler(event: DragEvent): void {
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
                event.preventDefault();
            const listEl = this.element.querySelector('ul')! as HTMLUListElement;
            listEl.classList.add('droppable')
        }
    }   @autobind
        dropHandler(event: DragEvent) {
            const prjId = event.dataTransfer!.getData('text/plain')
            projectState.moveProject(prjId,this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
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
