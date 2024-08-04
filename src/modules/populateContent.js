import getTodoItem from "./getTodoItem";
import todoItem from './todoItem';
import { editItemDialog } from "./makeDialog";

export default function populateContent(project) {
    let content = document.querySelector("#content");
    content.innerHTML = '';

    if(project) {
        let contentHeading = document.createElement('div');
        let contentTitle = document.createElement('div');
        let addItem = document.createElement('div');
        
        contentHeading.classList.add('contentHeading');
        contentTitle.textContent = project.name;
        contentTitle.classList.add('contentTitle');
        addItem.textContent = "+";
        addItem.classList.add('addItem');
        addItem.addEventListener('click', () => {
            let newItem = new todoItem('', '', '', '', '');
            project.addItem(newItem);
            editItemDialog(newItem, project);
            populateContent(project);
        })
        
        contentHeading.append(contentTitle, addItem);
        
        content.appendChild(contentHeading);
        
        for (const item of project.items) {
            if (item instanceof todoItem) {
                content.appendChild(getTodoItem(item, project));
            } else {
                console.log("populate content error: type of item: ", typeof(item));
            }
        }
    }
}