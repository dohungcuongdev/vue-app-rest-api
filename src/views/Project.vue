<template>
  <div>
    <h1>Project {{$route.params.id}}</h1>
    <h4>Name</h4>
    <h5>{{ project.name }}</h5>

    <h4>Bugs</h4>
    <h5>{{ project.bugs.length }}</h5>
    <h5 v-for="bug in project.bugs" :key="bug.name">{{ bug.name }}</h5>

    <h4>Code Smells</h4>
    <h5>{{ project.codeSmells.length }}</h5>
    <h5 v-for="codeSmell in project.codeSmells" :key="codeSmell.name">{{ codeSmell.name }}</h5>

    <h4>Debt</h4>
    <h5>{{ project.debt.debt }}</h5>
    <h5>{{ project.debt.rating }}</h5>
    <h5>{{ project.debt.debt_ratio }}</h5>
    <h5>{{ project.debt.effort_to_reach_A }}</h5>

    <h4>Coverage</h4>
    <h5>{{ project.coverage.coverage }}</h5>
    <h5>{{ project.coverage.lines_to_cover }}</h5>
    <h5>{{ project.coverage.uncovered_lines }}</h5>

    <h4>Unit Tests</h4>
    <h5>{{ project.unitTests.length }}</h5>
    <h5 v-for="unitTest in project.unitTests" :key="unitTest.dir">
        {{ unitTest.dir }}
        {{ unitTest.duration }}
        {{ unitTest.success }}
    </h5>

    <h4>Duplications</h4>
    <h5>{{ project.duplications.length }}</h5>
        <h5 v-for="duplication in project.duplications" :key="duplication.density">
        {{ duplication.density }}
        {{ duplication.duplicate_lines }}
        {{ duplication.duplicate_files }}
        {{ duplication.duplicate_blocks }}
    </h5>

    <h4>Done</h4>
    <h5>{{ project.done }}</h5>

    <router-link :to="{ path: '/sonar-qube'}" replace v-if="this.$route.path !== '/sonar-qube'">Go to Sonar Qube page</router-link>
    <div></div>
  </div>
</template>

<script>

import {ProjectService} from '../services/projectservice'
const projectService = new ProjectService(); //create new instance

export default {
    name: 'Project',
    data() {
        return {
            project: Object
        }
    },
    methods: {
        getSingeProject() {
          // eslint-disable-next-line
          console.log(this.$route.params.id);
          projectService.getProjectDataByID(this.$route.params.id).then((response) => {
             this.project = response;
             // eslint-disable-next-line
             console.log(this.project);
          }, error => {
              // eslint-disable-next-line
              console.log("No project matched the ID");
              this.project = {};

              // eslint-disable-next-line
              //console.error(error);
          });
        }
    },
    mounted() {
        this.getSingeProject();
    },

    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': 'getSingeProject' 
    },
}

</script>
