<template>
  <div>
    <h1>List Projects</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Bugs</th>
          <th>Code Smells</th>
          <th>Debt</th>
          <th>Coverage</th>
          <th>Unit Tests</th>
          <th>Duplications</th>
          <th>Done</th>
        </tr>
      </thead>
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
    </table>

    <router-link to="customers" v-if="this.$route.path !== '/customers'">Go to Customers page</router-link>
    <div></div>
  </div>
</template>

<script>

import {ProjectService} from '../services/projectservice'
const projectService = new ProjectService(); //create new instance

export default {
    name: 'SonarQube',
    data() {
        return {
            projects: [],
        }
    },
    components: {
        
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
