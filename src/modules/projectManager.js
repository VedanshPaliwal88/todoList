import project from "./project";
import todoItem from "./todoItem";

export default class projectManager {
    constructor() {
        this.projects = []
        this.loadFromLocalStorage();
    }

    addProject(project) {
        this.projects.push(project);
        this.saveToLocalStorage();
    }

    removeProject(project) {
        let idx = this.projects.indexOf(project);
        this.projects.splice(idx, 1);
    }

    saveToLocalStorage() {
        const data = this.projects.map(project => ({
            name: project.name,
            items: project.items.map(item => ({
                title: item.title,
                description: item.description,
                dueDate: item.dueDate,
                priority: item.priority,
                checked: item.checked
            }))
        }));
        localStorage.setItem("projets", JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const localStorageData = localStorage.getItem("projects");

        if(localStorageData) {
            this.projects = JSON.parse(localStorageData).map(projectData => {
                const newProject = new project(projectData.name);
                projectData.items.forEach(itemData => {
                    const newTodoItem = new todoItem(
                        itemData.title,
                        itemData.description,
                        itemData.dueDate,
                        itemData.priority,
                        itemData.checked);

                    newProject.addItem(newTodoItem);
                });
                return newProject
            })
        } else {
            console.log("empty");
            // logic to initialize if empty   
        }
    }
}