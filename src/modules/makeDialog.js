import populateContent from "./populateContent";
import { format } from 'date-fns';

function viewItemDialog(item, project) {
    let dialog = document.querySelector("#dialog");
    dialog.textContent = '';
    dialog.style.position = "relative";
    let title = document.createElement('span');
    let projectName = document.createElement('span');
    let description = document.createElement('span');
    let closeBtn = document.createElement('button');
    
    
    title.textContent = item.title;
    title.style.fontSize = "2rem";
    if (item.checked) {
        title.classList.add('checked');
    }

    projectName.textContent = "Project: " + project.name;
    description.textContent = "Description: " + item.description;

    closeBtn.textContent = "Close";
    closeBtn.addEventListener('click', () => {
        dialog.close();
    })
    
    let dueDate= document.createElement('span');
    dueDate.textContent = "Due date: " + item.dueDate;

    let priority = document.createElement('span');
    let priorityValue = document.createElement('span');
    priority.textContent = 'Priority: ';

    if (item.priority == 1) {
        priorityValue.textContent = "Low";
        priorityValue.style.color = "#adff2f";
    } else if (item.priority == 2) {
        priorityValue.textContent = "Medium";
        priorityValue.style.color = "#ffff00";
    } else if (item.priority == 3) {
        priorityValue.textContent = "High";
        priorityValue.style.color = "#a52a2a";
    }
    
    priority.append(priorityValue);

    dialog.append(title, projectName, description, dueDate, priority, closeBtn);
    dialog.showModal();
}

function editItemDialog(item, project) {
    let dialog = document.querySelector("#dialog");
    dialog.textContent = '';

    let title = document.createElement('span');
    let titleInput = document.createElement('input');
    let description = document.createElement('span');
    let descriptionInput = document.createElement('textarea');
    let dueDate = document.createElement('span')
    let dueDateInput = document.createElement('input')
    let priority = document.createElement('span');
    let priorityInputLow = document.createElement('input');
    let priorityInputMedium = document.createElement('input');
    let priorityInputHigh = document.createElement('input');

    let closeBtn = document.createElement('button');
    let submitBtn = document.createElement('button');
    
    title.textContent = "Title: ";
    titleInput.type = "text";
    titleInput.name = "title"
    titleInput.id = "title"
    titleInput.value = item.title;
    title.append(titleInput);
    
    description.textContent = "Description: ";
    descriptionInput.name = "description";
    descriptionInput.id = "description";
    descriptionInput.value = item.description;
    description.append(descriptionInput);

    dueDate.textContent = "Due date: ";
    dueDateInput.type = "date";
    dueDateInput.name = "dueDate";
    dueDateInput.id = "dueDate";
    let formattedDueDate = format(item.dueDate, 'yyyy-MM-dd');
    dueDateInput.value = formattedDueDate;
    console.log(item);
    dueDate.append(dueDateInput);

    priority.textContent = "Priority: ";
    
    priorityInputLow.textContent="Low";
    priorityInputLow.type = "radio";
    priorityInputLow.value = 1;
    priorityInputLow.name = "priority";
    priorityInputLow.style.color = "#adff2f";
    
    priorityInputMedium.textContent="Medium";
    priorityInputMedium.type = "radio";
    priorityInputMedium.value = 2;
    priorityInputMedium.name = "priority";
    priorityInputMedium.style.color = "#ffff00";
    
    priorityInputHigh.textContent="High";
    priorityInputHigh.type = "radio";
    priorityInputHigh.value = 3;
    priorityInputHigh.name = "priority";
    priorityInputHigh.style.color = "#a52a2a";
    
    if (item.priority == 2) priorityInputMedium.checked = true;
    else if (item.priority == 3) priorityInputHigh.checked = true;
    else priorityInputLow.checked = true;

    priority.append(priorityInputLow, "hello", priorityInputMedium, priorityInputHigh);

    dialog.addEventListener('close', function add(e) {
        e.preventDefault();
        // to prevent event listeners for different items getting linked
        let returns = []
        dialog.close(returns);
        dialog.removeEventListener('close', add);
    })
    
    submitBtn.addEventListener('click', function submit(e) {
        e.preventDefault();
        let priorityValue = document.querySelector('input[name="priority"]:checked').value;
        let returns = [titleInput.value, descriptionInput.value, dueDateInput.value, priorityValue];
        dialog.close(returns);
        item.editItem(...returns);
        populateContent(project);
        // to prevent event listeners for different items getting linked
        submitBtn.removeEventListener('click', submit);
    })
    submitBtn.textContent = "submit";
    
    closeBtn.addEventListener('click', function close() {
        let priorityValue = document.querySelector('input[name="priority"]:checked').value;
        let returns = [titleInput.value, descriptionInput.value, dueDateInput.value, priorityValue];
        dialog.close(returns);
        // to prevent event listeners for different items getting linked
        closeBtn.removeEventListener('click', close);
    })
    closeBtn.textContent = "close";

    dialog.append(title, description, dueDate, priority, submitBtn, closeBtn);
    dialog.showModal();
}

export {viewItemDialog, editItemDialog};