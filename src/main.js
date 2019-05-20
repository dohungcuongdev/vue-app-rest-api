import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './filters/global/capitalize'; // global filter
import './filters/global/alluppercase'; // global filter

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
