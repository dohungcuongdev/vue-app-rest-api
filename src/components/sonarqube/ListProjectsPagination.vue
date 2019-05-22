<template>
<list-projects :projects="projects"></list-projects>
</template>

<script>
import ListProjects from './ListProjects'

import {ProjectService} from '@/services/projectservice'
const projectService = new ProjectService(); //create new instance
const DEFAULT_API_URL = 'http://localhost:3000/pages';

//const DEFAULT_MAX_ROW_PER_PAGE = 10;

export default {
    name: 'ListProjectsPagination',
    data() {
        return {
            projects: [],
        }
    },
    components: {
      'list-projects': ListProjects
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
            required: false,
            default: 1
        }, 
        apiUrl: {
            type: String,
            required: false,
            default: DEFAULT_API_URL
        }
    }, 
    methods: {
        getAllProjectsAtPage() {
            projectService.changeApiUrlTo(this.apiUrl);
            projectService.getDataBy(this.currentPage).then((response) => {
                this.projects = response.projects;
                // eslint-disable-next-line
                console.log(this.projects);
            }, error => {
                // eslint-disable-next-line
                console.error(error);
                this.projects = [];
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