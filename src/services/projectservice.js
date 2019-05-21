import {APIService} from './apiservice';

const SONARQUBE_API_URL = 'http://localhost:3000/projects'
//const ENDPOINT = 'projects';
export class ProjectService extends APIService {

    constructor() {
        super();
        //super(ENDPOINT);
        super.changeApiUrlTo(SONARQUBE_API_URL);
    }

    getProjects() {
        return super.getData();
    }

    getProjectDataByID(id) {
        return super.getDataBy(id);
    }

    addProject(project) {
        return super.insertData(project);
    }

    editProject(project) {
        return super.updateDataByID(project);
    }

    deleteProject(project) {
        return super.deleteDataByID(project);
    }

}