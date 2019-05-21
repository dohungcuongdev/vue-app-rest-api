<template>
      <tbody>
        <tr v-for="project in projects" v-bind:key="project.id">
          <td>{{ project.id }}</td>

          <td><router-link :to="'/sonar-qube/projects/' + project.id">{{ project.name }}</router-link></td>

          <td>{{ project.bugs.length }}</td>

          <td>{{ project.codeSmells.length }}</td>

          <td>{{ project.debt.debt }}</td>

          <td>{{ project.coverage.coverage }}</td>

          <td>{{ project.unitTests.length }}</td>

          <td>{{ project.duplications.length }}</td>

          <td>{{ project.done }}</td>
        </tr>
      </tbody>
</template>

<script>
import {ProjectService} from '../services/projectservice'
const projectService = new ProjectService(); //create new instance
const API_URL = 'http://localhost:3000/pages';
projectService.changeApiUrlTo(API_URL);

//const DEFAULT_MAX_ROW_PER_PAGE = 10;

export default {
    name: 'ListProjectsPagination',
    data() {
        return {
            projects: [],
        }
    },
    props: {
        /*projects:{
            type: Array,
            required: true
        },
        maxRowPerPage: {
            type: Number,
            required: false,
            default: DEFAULT_MAX_ROW_PER_PAGE
        },*/
        currentPage: {
            type: Number,
            required: true,
        }
    }, 
    methods: {
        getAllProjectsAtPage() {
        projectService.getDataBy(this.currentPage).then((response) => {
            this.projects = response.projects;
            // eslint-disable-next-line
            console.log(this.projects);
        }, error => {
            // eslint-disable-next-line
            console.error(error);
        });
        },
    },
    mounted() {
        this.getAllProjectsAtPage();
    },
    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': 'getAllProjectsAtPage'
    },
}
</script>