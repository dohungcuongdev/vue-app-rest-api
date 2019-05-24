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
    name: 'Chart',
    extends: {

    },
    mixins: [],
    props: [],
    data() {
      
    },
    components: {
      
    },  
    filters: { // register filters
      
    },
    /*
    1. Methods are just static functions that run once called upon. You can pass in arguments, and they can return a value but are not required to.
    2. Computed properties will update automatically once their dependencies change. They don't accept any arguments and must return a single value.
    3. Watch functions allow you to monitor a single property and do stuff once it changes. They don't return any value.
    
    1. When to use methods
    To react on some event happening in the DOM
    To call a function when something happens in your component. You can call a methods from computed properties or watchers.
    
    2. When to use computed properties
    You need to compose new data from existing data sources
    You have a variable you use in your template that’s built from one or more data properties
    You want to reduce a complicated, nested property name to a more readable and easy to use one, yet update it when the original property changes
    You need to reference a value from the template. In this case, creating a computed property is the best thing because it’s cached.
    You need to listen to changes of more than one data property
    
    4. When to use watchers
    You want to listen when a data property changes, and perform some action
    You want to listen to a prop value change
    You only need to listen to one specific property (you can’t watch multiple properties at the same time)
    You want to watch a data property until it reaches some specific value and then do something
    */
    methods: {
        
    },
    computed() {
        // similar to method but there are some differences:
        // 1. cannot use () with computed, it means we cannot pass any parameter to it -> should use computed with variables in data only
        // 2. computed just only be called when the dependent variables changed -> better performance
    },
    watch: {
        // Listen to the event of changing any property in data
        $route (to, from) {

        }
    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
        this.$nextTrick = function() {

        }
    },
    beforeUpdate() {

    },
    updated() {

    },
    activated() {

    },
    deactivated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
    errorCaptured() {

    },
    render: function (createElement) {

    },
}