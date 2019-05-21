import {Collection} from 'vue-mc'
import Project from './project'

/**
 * Project collection
 */
export class ListProjects extends Collection {

    // Model that is contained in this collection.
    model() {
        return Project;
    }

    // Default attributes
    defaults() {
        return {
            orderBy: 'id',
            //orderBy: 'name',
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/projects',
        }
    }

    // Number of projects to be completed.
    get todo() {
        return this.sum('done');
    }

    // Will be `true` if all projects have been completed.
    get done() {
        return this.todo == 0;
    }
}