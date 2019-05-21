import {Model} from 'vue-mc'

/**
 * Project model
 */
export class Project extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            id: null,
            name: '',
            bugs: [],           // base unit - number
            codeSmells: [],     // base unit - number
            debt: {},           // base unit - hour
            coverage: {},       // base unit - percent %
            unitTests: [],      // base unit - number
            duplications: [],   // base unit - percent %
            done: false
        }
    }

    // Attribute mutations.
    mutations() {
        return {
            id:   (id) => Number(id) || null,
            name: String,
            bugs: Array,
            codeSmells: Array,
            debt: Object,
            coverage: Object,
            unitTests: Array,
            duplications: Array,
            done: Boolean,
        }
    }

    // Attribute validation
    validation() {
        return {
            id:   integer.and(min(1)).or(equal(null)),
            name: string.and(required),
            bugs: array,
            codeSmells: array,
            debt: object,
            coverage: object,
            unitTests: array,
            duplications: array,
            done: boolean,
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/projects/{id}',
            save:  '/project',
        }
    }
}