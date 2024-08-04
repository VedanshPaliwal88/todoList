import {manager, projectManager} from './modules/projectManager';
import './assets/style.css';
import project from './modules/project';
import populateMenu from './modules/populateMenu';
import populateContent from './modules/populateContent';
import todoItem from './modules/todoItem';

manager.loadFromLocalStorage();

populateMenu(manager.projects);
populateContent(manager.projects[0]);