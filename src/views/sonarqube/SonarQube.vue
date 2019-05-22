<template>
  <div>
    <h1>List Projects</h1>
    <table class="table table-bordered table-hover">
      <table-header></table-header>
      <list-projects v-bind:projects="projects"></list-projects>
    </table>

    <router-link to="customers" v-if="this.$route.path !== '/customers'">Go to Customers page</router-link>
    <div></div>
  </div>
</template>

<script>
import ListProjectsTableHeader from '@/components/sonarqube/ListProjectsTableHeader'
import ListProjects from '@/components/sonarqube/ListProjects'

import {ProjectService} from '@/services/projectservice'
const projectService = new ProjectService(); //create new instance

export default {
    name: 'SonarQube',
    data() {
        return {
            projects: [],
        }
    },
    components: {
      'table-header': ListProjectsTableHeader,
      'list-projects': ListProjects
    },  
    filters: { // register filters
      
    },
    methods: {
        getAllProjects() {
          projectService.getProjects().then((response) => {
             this.projects = response;
             // eslint-disable-next-line
             console.log(this.projects);
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        }
    },
    mounted() {
        this.getAllProjects();
    },
}

</script>
