import populateContent from "./populateContent";

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
        let editBtn = document.createElement('button');
        let textSpan = document.createElement('span');

        projectDiv.classList.add('project');
        textSpan.textContent = project.name;
        editBtn.textContent = "Edit"
        // add event listener
        projectDiv.appendChild(textSpan);
        projectDiv.appendChild(editBtn);
        menuContainer.appendChild(projectDiv);
    }

    let newProjectBtn = document.createElement('div');
    newProjectBtn.classList.add('add-project');
    newProjectBtn.textContent = "+ Add Project";
    // add event
    menuContainer.appendChild(newProjectBtn);

    menu.appendChild(menuContainer);
}