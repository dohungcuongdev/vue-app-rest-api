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
        <listproject v-bind:currentPage="currentPage"></listproject>
    </table>

    <button @click="prevPage">
        Previous
    </button>
    <!--
    <router-link v-for="page in totalPages" :key="page" :to="{ path: '/sonar-qube/' + page}" push>{{page}}</router-link>
    -->
    <button v-for="page in totalPages" :key="page" @click="navigatePage(page)" :class="activePageButton(page)">{{page}}</button>
    <button @click="nextPage">
        Next
    </button>
    <br/>
    <router-link :to="{ path: '/customers'}" replace v-if="this.$route.path !== '/customers'">Go to Customers page</router-link>
    <div></div>
  </div>
</template>

<script>

import ListProjectsPagination from './ListProjectsPagination'

import {ProjectService} from '../services/projectservice'
const projectService = new ProjectService(); //create new instance
const API_URL = 'http://localhost:3000/total_pages';
projectService.changeApiUrlTo(API_URL);

export default {
    name: 'SonarQubePagination',
    components: {
        'listproject': ListProjectsPagination
    },
    data() {
        return {
            totalPages: this.getToTalPage(),
            currentPage: 1  // default to page 1
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
          projectService.getData().then((response) => {
              this.totalPages = response.value;
              // eslint-disable-next-line
              console.log(this.totalPages);
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        },
        nextPage() {
          if(this.currentPage < this.totalPages) {
            this.navigatePage(++this.currentPage);
          }
        },
        prevPage() {
          if(this.currentPage > 1) {
            this.navigatePage(--this.currentPage);
          }
        },
        navigatePage(page) {
          if(page == null || isNaN(page) || page <= 0 || page > this.totalPages) {
            alert('Wrong page number');
            this.$router.push({ path: '/sonar-qube/' + this.currentPage })
            return;
          }
          page = parseInt(page);
          this.currentPage = page;
          this.$router.push({ path: '/sonar-qube/' + page })
        },
        activePageButton(page) {
          if(this.currentPage === page) {
            return "active-page";
          }
          return "non-active";
        }
    },
    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': function() {
        this.navigatePage(this.$route.params.page);
      }
    },
}
</script>