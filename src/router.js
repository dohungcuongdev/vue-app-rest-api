import Vue from 'vue'
import Router from 'vue-router'
import Customers from './views/customers/Customers.vue'
import CustomerDetails from './views/customers/CustomerDetails.vue'
import Contacts from './views/contacts/Contacts.vue'
import Contact from './views/contacts/Contact.vue'
import SonarQube from './views/sonarqube/SonarQube.vue'
import SonarQubePagination from './views/sonarqube/SonarQubePagination.vue'
import Project from './views/sonarqube/Project.vue'
import SearchProjects from './views/sonarqube/SearchProjects.vue'

//import {ROUTER_SonarQube} from '@/config/const'
//import {ROUTER_SonarQubePagination} from '@/config/const'
//import {ROUTER_Project} from '@/config/const'
import {ROUTER_SearchProjects} from '@/config/const'

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
      path: `${ROUTER_SearchProjects}`,
      name: 'search-projects',
      component: SearchProjects
    },
    {
      path: `${ROUTER_SearchProjects}/:keyword`,
      name: 'search-projects-keyword',
      component: SearchProjects
    },
    {
      path: `${ROUTER_SearchProjects}/:keyword/:page`,
      name: 'search-projects-keyword-page',
      component: SearchProjects
    },
  ]
})
export default router
