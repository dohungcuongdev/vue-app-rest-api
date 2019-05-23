<style>
button.active-page {
  color: brown
}

button.non-active {
  color: blue;
}
</style>

<template>
     <!--<div v-if="listData.length > 0">-->
    <div>
        <table-comp :headers="headers" :listData="listData" :listProperties="listProperties"></table-comp>
         <button @click="prevPage">
            Previous
        </button>
        <!--
        <router-link v-for="page in totalPages" :key="page" :to="{ path: '/sonar-qube/' + page}" push>{{page}}</router-link>
        -->
        <button v-for="page in getArrBE()" :key="page" @click="navigatePage(page)" :class="activePageButton(page)">{{page}}</button>
        <button @click="nextPage">
            Next
        </button>
    </div>
</template>

<script>
const MAX_PAGE_DISPLAY = 10;

import Table from './Table'
export default {
    name: 'TablePagination',
    data() {
        return {
            currentPage: 1, //default at page 1,
            pageB: 1, //begin
            pageE: 10, //end
            //pageE: this.totalPages > 10 ? 10: this.totalPages //end
            // pageB=1 2 3 4 5 currentPage=6 7 8 9 10
            // pageB=2 3 4 5 6 currentPage=7 8 9 10 11
        }
    },
    extends: {
        Table
    },
    props: {
        headers:{
          type: Array[String],
          required: true
        },
        listProperties: {
           type: Array[String],
           required: false,
           default: null
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
        getArrBE() {
          let arr = [];
          for(let i = this.pageB; i <= this.pageE; i++) {
            arr.push(i);
          }
          return arr;
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
          console.log(this.routerPath);
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
        //this.navigatePage(this.$route.params.page);
        this.$emit('currentPageUpdated', this.currentPage);
      },
      currentPage: function(newVal, oldVal) { // catch an event when currentPage is changed
          console.log("CurrentPage - New value: "+ newVal + ", Old value: " + oldVal);
          console.log(this.pageB);
          console.log(this.pageE);
          console.log(MAX_PAGE_DISPLAY/2 + 1);
          if(newVal > oldVal) {
            if(newVal > MAX_PAGE_DISPLAY/2 + 1) {
              if(this.pageE < this.totalPages) {
                ++this.pageE;
                ++this.pageB;
                console.log(this.pageB);
                console.log(this.pageE);
              }
            }
          } else {
            if(newVal > MAX_PAGE_DISPLAY/2 + 1) {
              if(this.pageE < this.totalPages) {
                --this.pageE;
                --this.pageB;
                console.log(this.pageB);
                console.log(this.pageE);
              }
            }
          }
      },
    },
}
</script>