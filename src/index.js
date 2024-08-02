import todoItem from './modules/todoItem';
import project from './modules/project';
import populateMenu from './modules/populateMenu';
import populateContent from './modules/populateContent';
import './css/style.css';


let item1 = new todoItem('hm', 'do it', 'never', '1', false);
let item2 = new todoItem('blah', 'karle', 'yesterday', '2', false);
let item3 = new todoItem('poop #4', 'have the 4th poop of the day','aaj', '3', false);
let item4 = new todoItem('Old laptop password', 'qwerty@123', 'hamesha', '1', false);
let newProject = new project('Home');
let oldProject = new project('work');

let myProjects = [newProject, oldProject];

newProject.addItem(item1);
newProject.addItem(item2);
newProject.addItem(item3);
oldProject.addItem(item4);


populateMenu(myProjects);
populateContent(newProject);