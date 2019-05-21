import Vue from 'vue'
import Router from 'vue-router'
import Customers from './views/Customers.vue'
import CustomerDetails from './views/CustomerDetails.vue'
import Contacts from './views/Contacts.vue'
import Contact from './views/Contact.vue'
import SonarQube from './views/SonarQube.vue'
import SonarQubePagination from './views/SonarQubePagination.vue'
import Project from './views/Project.vue'
import SearchProjects from './views/SearchProjects.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/customers'
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/customerdetails/:id',
      name: 'customerdetails',
      component: CustomerDetails
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/contacts/:id',
      name: 'contact',
      component: Contact
    },
    {
      path: '/sonar-qube',
      name: 'sonar-qube',
      component: SonarQube
    },
    {
      path: '/sonar-qube/:page',
      name: 'sonar-qube-page',
      component: SonarQubePagination
    },
    {
      path: '/sonar-qube/projects/:id',
      name: 'sonar-qube-project',
      component: Project
    },
    {
      path: '/search-projects',
      name: 'search-projects',
      component: SearchProjects
    }
  ]
})
export default router
