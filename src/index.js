import projectManager from './modules/projectManager';
import todoItem from './modules/todoItem';
import project from './modules/project';
import populateMenu from './modules/populateMenu';
import populateContent from './modules/populateContent';
import './css/style.css';

export let manager = new projectManager();



let today = new Date();
let item1 = new todoItem('hm', 'do it', today, '1', false);
let item2 = new todoItem('blah', 'karle', today, '2', false);
let item3 = new todoItem('poop #4', 'have the 4th poop of the day', today, '3', false);
let item4 = new todoItem('Old laptop password', 'qwerty@123', today, '1', false);
let newProject = new project('Home');
let oldProject = new project('work');

let projectsList = [newProject, oldProject];

newProject.addItem(item1);
newProject.addItem(item2);
newProject.addItem(item3);
oldProject.addItem(item4);

manager.addProject(newProject);
manager.addProject(oldProject);
// manager.saveToLocalStorage();
manager.loadFromLocalStorage();



populateMenu(manager.projects);
populateContent(manager.projects[0]);