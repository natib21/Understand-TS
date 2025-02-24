import { Component } from './base-component.js';
import { Project } from '../models/project.js';
import { Dragaable } from '../models/drag-drop.js';
import { autobind } from '../decorator/autobind.js';

export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Dragaable{
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
   event.dataTransfer!.setData('text/plain',this.projects.id)
   event.dataTransfer!.effectAllowed = 'move'
    
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
