// Register a global custom directive called `v-focus`
import Vue from 'vue';
Vue.directive('focus', {
    // When the bound element is inserted into the DOM…
    inserted: function (el) {
     // Focus the element
     el.focus();
     console.log("v-focus was called");
    }
})