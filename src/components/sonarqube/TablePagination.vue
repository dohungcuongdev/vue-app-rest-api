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
        <table-comp :headers="headers" :listData="listData"></table-comp>
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
    </div>
</template>

<script>
import Table from './Table'
export default {
    name: 'TablePagination',
    data() {
        return {
            currentPage: 1 //default at page 1
        }
    },
    props: {
        headers:{
          type: Array[String],
          required: true
        },
        listData: {
          type: Array[Object],
          required: true
        },
        totalPages: {
          type: Number,
          required: true
        },
        routerPath: {
          type: String,
          required: true
        }
    },
    components: {
        'table-comp': Table,
    },
    methods: {
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
            this.$emit('currentPageUpdated', this.currentPage);
            this.$router.push({ path: this.routerPath + this.currentPage })
            return;
          }
          page = parseInt(page);
          this.currentPage = page;
          this.$emit('currentPageUpdated', this.currentPage);
          this.$router.push({ path: this.routerPath + page })
        },
        activePageButton(page) {
          if(this.currentPage === page) {
            return "active-page";
          }
          return "non-active";
        }
    },
    mounted() {
      // eslint-disable-next-line
      console.log("TablePagination: mounted was called");

      // mounted from child component is called before parent component
      this.$emit('currentPageUpdated', this.currentPage);
    },
    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': function() {
        // eslint-disable-next-line
        console.log("TablePagination: watch was called");

        // watch from child component is called after parent component
        this.navigatePage(this.$route.params.page);
      }
    },
}
</script>