// Register a global custom directive called `v-logger`
import Vue from 'vue';
Vue.directive('logger', {
    // When the bound element is inserted into the DOM…
    inserted: function (el) {
     console.log("v-logger was called");
    }
})