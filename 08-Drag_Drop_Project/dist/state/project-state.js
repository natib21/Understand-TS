import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListner(Listner) {
        this.listeners.push(Listner);
    }
}
export class ProjectStateMgmg extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateMgmg();
        return this.instance;
    }
    addProject(title, description, numberOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listnerFn of this.listeners) {
            listnerFn(this.projects.slice());
        }
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            projectState.updateListners();
        }
    }
    updateListners() {
        for (const listnerFn of this.listeners) {
            listnerFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectStateMgmg.getInstance();
