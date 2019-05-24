
<template>
<div>
    <br/>
  <h3>
    Search Projects
  </h3>
    <input type="project_name" ref="project_name" v-model="keyword" placeholder="Project Name">
    <button @click.prevent="searchProjects()">Search</button>
    <hr/>
    <h1>List Projects</h1>
    <table-pagination :projects="projects" :totalPages="totalPages" :routerPath="routerPath" @currentPageUpdated="currentPage=$event"></table-pagination>
    <hr/>
    <button @click.prevent="viewAllProjects()">View All</button>
    
</div>
</template>
<script>
import TableProjectsPagination from '@/components/sonarqube/TableProjectsPagination'
import {ROUTER_SearchProjects} from '@/config/const'
import {SEARCH_PROJECT_API_URL} from '@/config/const'

import {isNotPositiveNumber} from '@/services/helper'

import { ProjectService } from "@/services/projectservice";
const projectService = new ProjectService(); //create new instance

const MAX_PAGE_DISPLAY = 10;

export default {
  name: "SearchProjects",
    data() {
      return {
        keyword: '',
        totalPages: 0,
        //totalPages: 10,
        projects: [],
        currentPage: 1,
        routerPath: `${ROUTER_SearchProjects}`,
        apiUrl: String
      }
  },
  components: {
      'table-pagination': TableProjectsPagination
  },
  filters: {
    // register filters
  },
  methods: {
    searchProjects() {
      /* this is search projects function, algorithum is in server side,
          client side just need to call REST api for the result*/
      console.log('searchProjects Button was clicked');
      if(this.keyword == null || this.keyword === '') {
        alert('Please enter keyword');
        return false;
      }
      this.$router.replace(`${ROUTER_SearchProjects}/${this.keyword}`);
    },
    getServerData() {
      projectService.getDataFromUrl(this.apiUrl).then(
        response => {
          this.projects = response.data;
          // eslint-disable-next-line
          console.log(this.projects);
          // Tempararily Hard Code
          if(this.keyword === 'Gradle')
            this.totalPages = 2
          else
            this.totalPages = 1
          console.log(this.totalPages);
        },
        error => {
          // eslint-disable-next-line
          console.error(error);

          this.projects = [];

        }
      );
    },
    refreshServerData() {
      console.log("refreshServerData was called");
      console.log(this.$route.params.page);
      console.log(this.$route.params.keyword);
      console.log(this.$route.params);
      if(this.$route.params.keyword == null || this.$route.params.keyword === '') {
        console.log('no keyword');
        this.keyword = '';
        this.projects = [];
        this.routerPath = '';
      } else {
        this.keyword = this.$route.params.keyword;
        if(isNotPositiveNumber(this.$route.params.page)) {
          this.currentPage = 1;
        } else {
          this.currentPage = parseInt(this.$route.params.page);
        }
        this.routerPath = `${ROUTER_SearchProjects}/${this.keyword}/`;
        this.apiUrl = `${SEARCH_PROJECT_API_URL}/${this.keyword}/${this.currentPage}`;
        console.log(`${SEARCH_PROJECT_API_URL}`);
        console.log(`${this.keyword}`);
        console.log(`${this.currentPage}`);
        console.log(this.currentPage);
        this.getServerData();
      }
    },
    viewAllProjects() {
      this.$router.replace({ path: '/sonar-qube/1' })
    },
    onChildClick (value) {
      // pass value from child to parent
      this.currentPage = value
    }
  },
  mounted() {
      // eslint-disable-next-line
      console.log("SearchProjects: mounted was called");

      // mounted from child component is called before parent component
      this.refreshServerData();
  },
  /* Fetching After Navigation*/
  watch: { 
    // call again the method if the route changes
    '$route': function() {
      // eslint-disable-next-line
      console.log("SearchProjects: watch was called - route changed");

      // watch from child component is called after parent component
      this.refreshServerData();
    }
  },
};
</script>
