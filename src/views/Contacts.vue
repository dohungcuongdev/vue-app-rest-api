<template>
  <div>
    <h1>List Contacts</h1>
    <h5>{{testalluppercase || alluppercase}}</h5>
    <h5>{{testcapitalize || capitalize}}</h5>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" v-bind:key="contact.id">
          <th>{{ contact.id }}</th>

          <th>{{ contact.first_name }}</th>

          <td>{{ contact.last_name }}</td>

          <td>{{ contact.email }}</td>

          <td>{{ contact.phone }}</td>

          <td>{{ contact.address }}</td>

          <td><router-link to="contacts/id">View</router-link></td>

          <td>
            <button class="btn btn-danger" @click="deleteContact(contact)">X</button>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link to="customers" v-if="this.$route.path !== '/customers'">Go to Customers page</router-link>
    <div></div>
  </div>
</template>

<script>

import {ContactService} from '../services/contactservice'
const contactService = new ContactService(); //create new instance

import concat from '../filters/default/concat';

export default {
    name: 'ListContacts',
    data() {
        return {
            contacts: [],
            testalluppercase: "test all uppercase",
            testcapitalize: "test capitalize"
        }
    },
    components: {
        
    },  
    filters: {
      concat
    },
    methods: {
        getAllContacts() {
          contactService.getContacts().then((response) => {
             this.contacts = response.data;
             // eslint-disable-next-line
             console.log(this.contacts);
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        }, 
        deleteContact(contact) {
          contactService.deleteContact(contact).then((response) => {

          }, error => {

          });
        }

    },
    mounted() {
        this.getAllContacts();
    },
}

</script>
