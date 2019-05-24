import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './filters/global/capitalize.js' // global filter
import './filters/global/alluppercase.js' // global filter
import './directives/v-focus.js' // global directive
import './directives/v-logger.js' // global directive

Vue.config.productionTip = false
Vue.use(BootstrapVue);

var vm = new Vue({
  router,
  customOption: 'cuong',
  render: h => h(App)
}).$mount('#app')

console.log(vm.$options.customOption); //test $options