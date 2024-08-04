import project from "./project";
import todoItem from "./todoItem";

class projectManager {
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
        localStorage.setItem("projects", JSON.stringify(data));
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
            console.log("empty")
            // let newProject1 = new project("Home");
            // let item1 = new todoItem()
            fetch('items.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("projects", JSON.stringify(data));
                    this.loadFromLocalStorage();
                    // this.projects = data.map(projectData => {
                    //     const newProject = new project(projectData.name);
                    //     projectData.items.forEach(item => {
                    //         const newTodoItem = new todoItem(
                    //             itemData.title,
                    //             itemData.description,
                    //             itemData.dueDate,
                    //             itemData.priority,
                    //             itemData.checked);
        
                    //         newProject.addItem(newTodoItem);
                    //     });
                    //     return newProject;
                    // });
                    // localStorage.setItem("projects", JSON.stringify(this.projects));
                })
                .catch(error => console.log("error fetching items from items.json: ", error));
            
        }
    }
}

let manager = new projectManager();
export {manager, projectManager};