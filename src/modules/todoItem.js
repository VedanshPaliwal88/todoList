import projectManager from "./projectManager";
import {manager} from "../index";
export default class todoItem {
    constructor(title, description, dueDate, priority, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
        manager.saveToLocalStorage();
    }
    
    editItem(title, description, dueDate, priority, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
        manager.saveToLocalStorage();
    }

    toggleCheck() {
        this.checked = !(this.checked);
    }
}