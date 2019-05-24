<style>
button.active-page {
  color: brown
}

button.non-active {
  color: blue;
}
</style>

<template>
     <div v-if="listData.length > 0">
        <table-comp :headers="headers" :listData="listData" :listProperties="listProperties"></table-comp>
         <button @click="prevPage">
            Previous
        </button>
        <!--
        <router-link v-for="page in totalPages" :key="page" :to="{ path: '/sonar-qube/' + page}" push>{{page}}</router-link>
        -->
        <button v-for="page in getArrBE" :key="page" @click="navigatePage(page)" :class="activePageButton(page)">{{page}}</button>
        <button @click="nextPage">
            Next
        </button>
    </div>
</template>

<script>
const MAX_PAGE_DISPLAY = 10;

import {isNotPositiveNumber} from '@/services/helper'

import Table from './Table'
export default {
    name: 'TablePagination',
    data() {
        return {
            currentPage: 1, //default at page 1,
            pageB: 1, //begin
            pageE: (this.totalPages != null && this.totalPages > MAX_PAGE_DISPLAY)? MAX_PAGE_DISPLAY: this.totalPages, //end
            //pageE: this.totalPages > 10 ? 10: this.totalPages, //end
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
    computed: {
        getArrBE() { //this method generate an array of number start from pageB to pageE, will be used with v-for
          let arr = [];
          for(let i = this.pageB; i <= this.pageE; i++) {
            arr.push(i);
          }
          return arr;
        },
    },
    methods: {
        nextPage() { //click on next page button, go to next page
          if(this.currentPage < this.totalPages) {
            this.navigatePage(++this.currentPage);
          }
        },
        prevPage() { //click on prev page button, go to prev page
          if(this.currentPage > 1) {
            this.navigatePage(--this.currentPage);
          }
        },
        getPageHandleAndShowError(page) {
          console.log("getPageHandleAndShowError was called");
          console.log(this.routerPath);
          if(this.totalPages == 0) {
            //case RESRful data is not available yet

          }
          if(this.currentPage > this.totalPages) {
            
          }
          if(isNotPositiveNumber(page)) {
            alert('Wrong page number');
            console.log(this.currentPage);
            console.log(typeof this.currentPage);
            this.$emit('currentPageUpdated', this.currentPage);
            console.log(this.routerPath);
            this.$router.replace({ path: this.routerPath + this.currentPage });
          }
          return parseInt(page);
        },
        navigatePage(page) { // go to the expected page
          console.log("navigatePage was called");
          console.log(this.routerPath);
          this.currentPage = this.getPageHandleAndShowError(page);
          this.$emit('currentPageUpdated', this.currentPage);
          this.$router.replace({ path: this.routerPath + page })
        },
        activePageButton(page) { // change current page button color
          if(this.currentPage === page) {
            return "active-page";
          }
          return "non-active";
        },
        updatePageBE() { //update page begin and page end arcodingly
          if(this.totalPages <= MAX_PAGE_DISPLAY) {
            this.pageB = 1;
            this.pageE = this.totalPages;
          } else {
            if((this.currentPage >= MAX_PAGE_DISPLAY/2 + 1)) {
              if(this.currentPage < this.totalPages - MAX_PAGE_DISPLAY/2 + 1) {
                this.pageB = this.currentPage - MAX_PAGE_DISPLAY/2;
                this.pageE = this.currentPage + MAX_PAGE_DISPLAY/2 - 1;
              } else {
                this.pageB = this.totalPages - MAX_PAGE_DISPLAY + 1;
                this.pageE = this.totalPages;
              }
            } else {
              this.pageB = 1;
              this.pageE = MAX_PAGE_DISPLAY;
            }
          }
        }
    },
    mounted() {
      // eslint-disable-next-line
      console.log("TablePagination: mounted was called");
      this.$nextTick(() => {
        //nextTick is called after component was rendered
        //in this case parent and child will be mounted() before calling nextTick
        //however totalPages need time for axos to perform so the value still be 0
        console.log("TablePagination: nextTick was called")
        console.log("this.totalPages="+this.totalPages);
		  });
      // mounted from child component is called before parent component
      let page = this.$route.params.page;
      console.log(page);
      if(page == null || page === '') {
        return;
      }
      this.currentPage = this.getPageHandleAndShowError(page);
      this.$emit('currentPageUpdated', this.currentPage);
      this.updatePageBE();
    },
    /* Fetching After Navigation*/
    watch: { 
      // call again the method if the route changes
      '$route': function() {
        // eslint-disable-next-line
        console.log("TablePagination: watch was called - route changed");

        // watch from child component is called after parent component
        let page = this.$route.params.page;
        if(page == null || page === '') {
          return;
        }
        this.currentPage = this.getPageHandleAndShowError(page);
        this.$emit('currentPageUpdated', this.currentPage);
        //this.navigatePage(this.$route.params.page);
        this.updatePageBE();
      },
      currentPage: function(newVal, oldVal) { // catch an event when currentPage is changed
        console.log("CurrentPage - New value: "+ newVal + ", Old value: " + oldVal);
        this.updatePageBE();
      },
      totalPages: function(newVal, oldVal) { // catch an event when totalPages is changed
        //get API need a lot of times, we are using axois to get the API, it means we are using callback
        //that need time to perform, meanwhile other functions would be called before it finised
        //so the value of totalPages will be 0 after child component rendered
        //we need to catch event if when it is changed by the parent then updatePageBE arcodingly 
        console.log("totalPages - New value: "+ newVal + ", Old value: " + oldVal);
        this.updatePageBE();
      },
    },
}
</script>