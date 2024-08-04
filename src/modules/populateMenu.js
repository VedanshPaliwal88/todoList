import populateContent from "./populateContent";
import project from "./project";
import {manager, projectManager} from './projectManager';

export default function populateMenu(myProjects) {
    let menu = document.querySelector("menu");
    menu.innerHTML = '';
    let menuContainer = document.createElement('div');
    let menuTitle = document.createElement('div');

    menuTitle.classList.add('menuTitle');
    menuTitle.textContent = "Projects: ";
    menuContainer.classList.add("menuContainer");
    menuContainer.appendChild(menuTitle);


    for (const project of myProjects) {
        let projectDiv = document.createElement('div');
        projectDiv.addEventListener('click', () => populateContent(project));
        let deleteBtn = document.createElement('button');
        let textSpan = document.createElement('span');

        projectDiv.classList.add('project');
        textSpan.textContent = project.name;
        deleteBtn.textContent = "delete"
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let idx = myProjects.indexOf(project);
            myProjects.splice(idx, 1);
            populateMenu(myProjects);
            if (myProjects == []) populateContent('');
            else populateContent(myProjects[0]);
            manager.saveToLocalStorage();
        })
        projectDiv.appendChild(textSpan);
        projectDiv.appendChild(deleteBtn);
        menuContainer.appendChild(projectDiv);
    }

    let newProjectBtn = document.createElement('div');
    newProjectBtn.classList.add('add-project');
    newProjectBtn.textContent = "+ Add Project";
    newProjectBtn.addEventListener('click', () => {
        let newProjectDiv = document.createElement('div');
        let newProjectInput = document.createElement('input');
        let submtiBtn = document.createElement('button');

        newProjectInput.type = 'text';
        newProjectInput.classList.add('newProjectInput')
        newProjectInput.autofocus = true;
        submtiBtn.textContent = "add";
        
        submtiBtn.addEventListener('click', () => {
            if (newProjectInput.value) {
                let newProject = new project(newProjectInput.value);
                myProjects.push(newProject);
                populateMenu(myProjects);
                manager.saveToLocalStorage();
            }
        })
        newProjectDiv.append(newProjectInput, submtiBtn);

        menuContainer.insertBefore(newProjectDiv, newProjectBtn);

    })
    menuContainer.appendChild(newProjectBtn);

    menu.appendChild(menuContainer);
}