// import this filter in main.js and use globally
import Vue from 'vue';

Vue.filter('alluppercase', value => {
  return value.toUpperCase();
});