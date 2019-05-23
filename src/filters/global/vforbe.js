// import this filter in main.js and use globally
import Vue from 'vue';

Vue.filter('vforbe', function (start,end) {
    var array = [],
    j = 0;
    for(var i = start; i <= end; i++){
        array[j] = i;
        j++;
    }
    return array;
})