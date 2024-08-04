import deleteItem from "./deleteItem";
import populateContent from "./populateContent";
import {viewItemDialog, editItemDialog} from "./makeDialog";
import {manager, projectManager} from './projectManager';  
import { format } from 'date-fns';

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
    let checkBtn = document.createElement('button');
    let dueDate = document.createElement('dueDate');

    todoItem.classList.add('todoItem');

    if(item.priority == 1) {
        todoItem.classList.add('lowPriority');
    } else if(item.priority == 2) {
        todoItem.classList.add('mediumPriority');
    } else if(item.priority == 3) {
        todoItem.classList.add('highPriority');
    } else {
        console.log("new item created or priority background assigning error ", item.title);
    }

    itemHeading.classList.add('itemHeading');
    itemTitle.classList.add('itemTitle');
    itemTitle.textContent = item.title;
    
    if (item.checked) {
        itemTitle.classList.toggle('checked');
    }

    editBtn.textContent="edit";
    deleteBtn.textContent="delete";
    checkBtn.textContent="✓";
        
    deleteBtn.addEventListener('click', (e) => {
        deleteItem(item, project)
        populateContent(project);
        e.stopPropagation();
        manager.saveToLocalStorage();
    })
    
    editBtn.addEventListener('click', (e) => {
        editItemDialog(item, project);
        e.stopPropagation();
        manager.saveToLocalStorage();
    })

    checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(item.checked);
        item.toggleCheck();
        console.log(item.checked);
        itemTitle.classList.toggle('checked');
        manager.saveToLocalStorage();
    })


    itemBtns.append(checkBtn, editBtn, deleteBtn);
    itemBtns.classList.add('itemBtns');

    itemHeading.append(itemTitle, itemBtns);
    dueDate.classList.add('dueDate');
    if (item.dueDate) {
        const formattedDate = format(item.dueDate, 'MMMM dd, yyyy');
        dueDate.textContent = formattedDate;
    } 
    todoItem.append(itemHeading, dueDate);
    return todoItem;
}