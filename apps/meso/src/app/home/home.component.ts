import { Component, OnInit } from '@angular/core';

interface BaseEntity {
  id: string | null
}

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
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


const initialProjectState: ProjectsState = {
  projects,
  currentProject: newProject
}

interface AppState {
  clientState: ClientsState;
  projectState: ProjectsState;
}

const appState: AppState = {
  clientState: initialClientState,
  projectState: initialProjectState
}
const tango = appState

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
