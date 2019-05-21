
<template>
<div>
    <br/>
  <h3>
    Search Projects
  </h3>
    <input type="project_name" ref="project_name" placeholder="Project Name">
    <button @click.prevent="searchProjects()">Search</button>

    <searchresults></searchresults>
</div>
</template>
<script>
import { ProjectService } from "../services/projectservice";
const projectService = new ProjectService(); //create new instance
const SEARCH_API_URL = "http://localhost:3000/search_results";

import SonarQubePagination from "./SonarQubePagination";

export default {
  name: "SearchProjects",
  data() {
    return {
      projects: []
    };
  },
  components: {
    'searchresults': SonarQubePagination
  },
  filters: {
    // register filters
  },
  methods: {
    searchProjects() {
      /* this is search projects function, algorithum is in server side,
          client side just need to call REST api for the result*/
      projectService.getDataFromUrl(SEARCH_API_URL).then(
        response => {
          this.totalPages = response.value;
          // eslint-disable-next-line
          console.log(this.totalPages);
        },
        error => {
          // eslint-disable-next-line
          console.error(error);
        }
      );
    }
  },
  mounted() {
    
  }
};
</script>
