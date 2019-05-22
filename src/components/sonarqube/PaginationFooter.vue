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
export default {
    name: 'PaginationFooter',
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        routerPath: {
            type: String,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    methods: {
        nextPage() {
          if(this.currentPage < this.totalPages) {
            let nextPage = this.currentPage+1;
            this.$emit('currentPageWasUpdated', nextPage);
            this.navigatePage(nextPage);
          }
        },
        prevPage() {
          if(this.currentPage > 1) {
            let prevPage = this.currentPage-1;
            this.$emit('currentPageWasUpdated', prevPage);
            this.navigatePage(prevPage);
          }
        },
        navigatePage(page) {
          if(page == null || isNaN(page) || page <= 0 || page > this.totalPages) {
            alert('Wrong page number');
            this.$router.push({ path: '/' + this.routerPath + '/' + this.currentPage })
            return;
          }
          page = parseInt(page);
          this.$emit('currentPageWasUpdated', page);
          this.$router.push({ path: '/' + this.routerPath + '/' + page })
        },
        activePageButton(page) {
          if(this.currentPage === page) {
            return "active-page";
          }
          return "non-active";
        },
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