<style>
button.active-page {
  color: brown
}

button.non-active {
  color: blue;
}
</style>

<template>
  <div>
    <h1>List Projects</h1>
    <table-pagination :listData="projects" :headers="headers" :listProperties="listProperties" :totalPages="totalPages" :routerPath="routerPath" @currentPageUpdated="currentPage=$event"></table-pagination>
    <router-link :to="{ path: '/customers'}" replace v-if="this.$route.path !== '/customers'">Go to Customers page</router-link>
    <div></div>
  </div>
</template>

<script>

import TablePagination from '@/components/sonarqube/TablePagination'

import ListProjectsTableHeader from '@/components/sonarqube/ListProjectsTableHeader'
import ListProjectsPagination from '@/components/sonarqube/ListProjectsPagination'

import {PROJECTS_HEADER} from '@/config/const'
import {PROJECTS_PROPERTIES} from '@/config/const'

import {ProjectService} from '@/services/projectservice'
const projectService = new ProjectService(); //create new instance
const API_TOTAL_PAGES = 'http://localhost:3000/total_pages';
const API_PROJECTS_PAGE = 'http://localhost:3000/pages';
const ROUTER_PATH = '/sonar-qube/'

export default {
    name: 'SonarQubePagination',
    components: {
        'table-pagination': TablePagination
    },
    data() {
        return {
            totalPages: 0,
            //totalPages: 10,
            projects: [],
            headers: PROJECTS_HEADER,
            listProperties: PROJECTS_PROPERTIES,
            currentPage: Number,
            routerPath: ROUTER_PATH
        }
    },
    methods: {
        /*
          Logic is: 
          Server will return 2 APIs for client
            - total pages as the value of an object
            - 10 projects each page: require page current 
              (E.g page 1: project 1-10, page 2: project 11-20, ...)
          Client then fetch these APIs from server to display using a sub-component
          This approach will improve the performence if the data is terrific
        */
        getToTalPage() {
          projectService.changeApiUrlTo(API_TOTAL_PAGES);
          projectService.getData().then((response) => {
              this.totalPages = response.value;
              // eslint-disable-next-line
              console.log(this.totalPages);
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        },
        getAllProjectsAtPage() {
            projectService.changeApiUrlTo(API_PROJECTS_PAGE);
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
        onChildClick (value) {
            // pass value from child to parent
            this.currentPage = value
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log("SonarQubePagination: mounted was called");

        // mounted from child component is called before parent component
        this.getAllProjectsAtPage();
        this.getToTalPage();
        console.log(PROJECTS_PROPERTIES)
    },
    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': function() {
        // eslint-disable-next-line
        console.log("SonarQubePagination: watch was called");

        // watch from child component is called after parent component
        this.currentPage = this.$route.params.page; // without this line, it will be error if user press address bar
        this.getAllProjectsAtPage();
        this.getToTalPage();
      }
    },
}
</script>