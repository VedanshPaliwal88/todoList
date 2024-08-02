import deleteItem from "./deleteItem";
import populateContent from "./populateContent";
import {viewItemDialog, editItemDialog} from "./makeDialog";

export default function getTodoItem(item, project) {
    let todoItem = document.createElement('div');
    todoItem.addEventListener('click', () => {
        viewItemDialog(item, project);
    })

    let itemHeading = document.createElement('div');
    let itemTitle = document.createElement('span');
    let itemBtns = document.createElement('div');
    let editBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');
    let dueDate = document.createElement('dueDate');

    todoItem.classList.add('todoItem');

    if(item.priority == 1) {
        todoItem.classList.add('lowPriority');
    } else if(item.priority == 2) {
        todoItem.classList.add('mediumPriority');
    } else if(item.priority == 3) {
        todoItem.classList.add('highPriority');
    } else {
        console.log("priority background assigning error: ", item.title);
    }

    itemHeading.classList.add('itemHeading');
    itemTitle.classList.add('itemTitle');
    itemTitle.textContent = item.title;
    editBtn.textContent="edit";
    deleteBtn.textContent="delete";
    deleteBtn.addEventListener('click', (e) => {
        deleteItem(item, project)
        populateContent(project);
        e.stopPropagation();
    })
    editBtn.addEventListener('click', (e) => {
        editItemDialog(item, project);
        e.stopPropagation();
    })
    itemBtns.append(editBtn, deleteBtn);
    itemHeading.append(itemTitle, itemBtns);
    dueDate.classList.add('dueDate');
    dueDate.textContent = item.dueDate;

    todoItem.append(itemHeading, dueDate);
    return todoItem;
}