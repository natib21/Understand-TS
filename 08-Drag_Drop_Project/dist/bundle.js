var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(templateId, hostElementId, newElementId, insertAtStart) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    exports.Component = Component;
});
define("utils/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = validate;
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            if (typeof validatableInput.value === 'string') {
                isValid = isValid && validatableInput.value.trim().length !== 0;
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
        return isValid;
    }
});
define("decorator/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = autobind;
    function autobind(target, methodName, descriptor) {
        const originalMethod = descriptor.value;
        //  console.log(originalMethod)
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    class Project {
        constructor(id, title, description, numberOfPeople, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.numberOfPeople = numberOfPeople;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectStateMgmg = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListner(Listner) {
            this.listeners.push(Listner);
        }
    }
    class ProjectStateMgmg extends State {
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
            const newProject = new project_1.Project(Math.random().toString(), title, description, numberOfPeople, project_1.ProjectStatus.Active);
            this.projects.push(newProject);
            for (const listnerFn of this.listeners) {
                listnerFn(this.projects.slice());
            }
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                exports.projectState.updateListners();
            }
        }
        updateListners() {
            for (const listnerFn of this.listeners) {
                listnerFn(this.projects.slice());
            }
        }
    }
    exports.ProjectStateMgmg = ProjectStateMgmg;
    exports.projectState = ProjectStateMgmg.getInstance();
});
define("components/project-input", ["require", "exports", "components/base-component", "utils/validation", "decorator/autobind", "state/project-state"], function (require, exports, base_component_js_1, validation_js_1, autobind_js_1, project_state_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_component_js_1.Component {
        constructor() {
            super('project-input', 'app', 'user-input', true);
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        gatherUserInputs() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: enteredPeople,
                required: true,
                min: 1,
                max: 5
            };
            if (!(0, validation_js_1.validate)(titleValidatable) ||
                !(0, validation_js_1.validate)(descriptionValidatable) ||
                !(0, validation_js_1.validate)(peopleValidatable)) {
                alert("Invalid Input");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clear() {
            this.titleInputElement.value = " ";
            this.descriptionInputElement.value = " ";
            this.peopleInputElement.value = " ";
        }
        submitHandler(event) {
            event.preventDefault();
            console.log(this.titleInputElement.value);
            const userInput = this.gatherUserInputs();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                project_state_js_1.projectState.addProject(title, desc, people);
                this.clear();
            }
        }
        renderContent() {
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
    }
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_js_1.autobind
    ], ProjectInput.prototype, "submitHandler", null);
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base-component", "decorator/autobind"], function (require, exports, base_component_1, autobind_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_component_1.Component {
        get persons() {
            if (this.projects.numberOfPeople === 1) {
                return '1 person';
            }
            else {
                return `${this.projects.numberOfPeople} persons`;
            }
        }
        constructor(hostId, project) {
            super('single-project', hostId, project.id, false);
            this.projects = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.projects.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) {
            console.log('DragEnd');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.projects.title;
            this.element.querySelector('h3').textContent = this.persons + ' Assinged';
            this.element.querySelector('p').textContent = this.projects.description;
        }
    }
    exports.ProjectItem = ProjectItem;
    __decorate([
        autobind_1.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
});
define("components/project-list", ["require", "exports", "components/base-component", "components/project-item", "models/project", "decorator/autobind", "state/project-state"], function (require, exports, base_component_2, project_item_1, project_2, autobind_2, project_state_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_component_2.Component {
        constructor(type) {
            super('project-list', 'app', `${type}-projects`, false);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new project_item_1.ProjectItem(this.element.querySelector('ul').id, prjItem);
            }
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData('text/plain');
            project_state_1.projectState.moveProject(prjId, this.type === 'active' ? project_2.ProjectStatus.Active : project_2.ProjectStatus.Finished);
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            project_state_1.projectState.addListner((projects) => {
                const relavantProjects = projects.filter((item) => {
                    if (this.type === 'active') {
                        return item.status === project_2.ProjectStatus.Active;
                    }
                    return item.status === project_2.ProjectStatus.Finished;
                });
                this.assignedProjects = relavantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        }
    }
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dropHandler", null);
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_1, project_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_1.ProjectInput();
    new project_list_1.ProjectList('active');
    new project_list_1.ProjectList('finished');
});
/// Lecture 123
