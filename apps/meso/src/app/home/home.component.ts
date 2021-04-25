import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

interface BaseEntity {
  id: string | null
}

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

interface Action {
  type: string;
  payload?: any;
}


const peter: Client = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Acme, Inc'
}

const john: Client = {
  id: '2',
  firstName: 'Jão',
  lastName: 'Porker',
  company: 'Acme, Inc'
}

const clients: Client[] = [
  peter,
  john
]

interface ClientsState {
  clients: Client[];
  currentClient: Client;
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: ''
}

const initialClientState: ClientsState = {
  clients,
  currentClient: newClient
}

class ClientStore {
  state: ClientsState;

  constructor(state: ClientsState) {
    this.state = state
  }

  getState() {
    return this.state
  }

  select(key: string) {
    this.state[key]
  }
}

const CLIENT_LOAD    = '[Client] Load';
const CLIENT_CREATE  = '[Client] Create';
const CLIENT_UPDATE  = '[Client] Update';
const CLIENT_DELETE  = '[Client] Delete';
const CLIENT_SELECT  = '[Client] Select';
const CLIENT_CLEAR   = '[Client] Clear';

const loadClients = (state, clients) => {
  console.log('LOAD CLIENTS!', clients)
  return state
}

const selectClient = (state, client) => {
  console.log('LOAD CLIENT!', client)
  return state
}


const clientsReducer = (state: ClientsState = initialClientState, action: Action) => {
  switch(action.type) {
    case CLIENT_LOAD:
      return loadClients(state, action);
    case CLIENT_SELECT: 
      return selectClient(state, action.payload);
    default:
      return state;
  }
}

const clientsStore = new ClientStore(initialClientState)
const currentClient = clientsStore.select('currentClient')

//clientsStore.load(clients)
//clientsStore.select(peter)



interface Project extends BaseEntity {
  title: string;
  description: string;
  completed: boolean;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}
 
const superProject: Project = {
  id: '1',
  title: 'Super Project',
  description: 'This is Awesome',
  completed: false
}

const hellProject: Project = {
  id: '2',
  title: 'Hell Project on Earth',
  description: 'Just make it stop',
  completed: true
}

const newProject: Project = {
  id: null,
  title: '',
  description: '',
  completed: false
}

const projects: Project[] = [
  superProject,
  hellProject
]


const initialProjectsState: ProjectsState = {
  projects,
  currentProject: newProject
}

const PROJECT_LOAD    = '[Project] Load';
const PROJECT_CREATE  = '[Project] Create';
const PROJECT_UPDATE  = '[Project] Update';
const PROJECT_DELETE  = '[Project] Delete';
const PROJECT_SELECT  = '[Project] Select';
const PROJECT_CLEAR   = '[Project] Clear';

const loadProjects = (state: ProjectsState, projects: Project[]): ProjectsState => {
  return {
    projects,
    currentProject: state.currentProject
  }
}

const selectProject = (state: ProjectsState, project: Project): ProjectsState => {
  return {
    projects: state.projects,
    currentProject: project
  }
}

const createProject = (state: ProjectsState, project: Project): ProjectsState => {
  return {
    projects: [...state.projects, project],
    currentProject: state.currentProject
  }
}

const updateProject = (state: ProjectsState, project: Project): ProjectsState => {
  return {
    projects: state.projects.map(p => {
      return (p.id !== project.id) ? Object.assign({}, project) : p
    }),
    currentProject: state.currentProject
  }
}

const deleteProject = (state: ProjectsState, project: Project): ProjectsState => {
  return {
    projects: state.projects.filter(p => p.id !== project.id),
    currentProject: null
  }
}

const projectsReducer = (state = initialProjectsState, action: Action): ProjectsState => {
  switch (action.type) {
    case PROJECT_LOAD:
      return loadProjects(state, action.payload);
    case PROJECT_SELECT:
      return selectProject(state, action.payload);
    case PROJECT_CREATE:
      return createProject(state, action.payload);
    case PROJECT_UPDATE:
      return updateProject(state, action.payload);
    case PROJECT_DELETE:
      return deleteProject(state, action.payload);
    default:
      return state;
  }
}

class ProjectsStore {
  state: ProjectsState;
  reducer

  constructor(state: ProjectsState, reducer) {
    this.state = state;
    this.reducer = reducer
  }

  select(key: string) {
    return this.state[key];
  }

  getState(): ProjectsState {
    return this.state;
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action)
  }

}

const projectsStore = new ProjectsStore(initialProjectsState, projectsReducer);
const aProject = projectsStore.select('currentProject')
projectsStore.dispatch({ type: PROJECT_CREATE, payload: hellProject})
const allProjects = projectsStore.select('projects')

interface AppState {
  clientState: ClientsState;
  projectState: ProjectsState;
}

const appState: AppState = {
  clientState: initialClientState,
  projectState: initialProjectsState
}
const tango = allProjects

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
