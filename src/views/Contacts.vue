<template>
  <div>
    <h1>List Contacts</h1>
    <!-- Filters are working fine, I just put here to test only-->
    <!--
    <h5>{{testalluppercase | alluppercase}}</h5>
    <h5>{{testcapitalize | capitalize}}</h5>
    <h5>{{testconcat | concat('arg1', 'arg1')}}</h5>
    -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Add</th>
          <th>Edit</th>
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

          <td><router-link :to="'/contacts/' + getfirstMissingContactID()">Add</router-link></td>

          <td><router-link :to="'/contacts/' + contact.id">Edit</router-link></td>

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

import concat from '../filters/default/concat'; //filter

import {firstMissingID} from '../services/helper' //helper function

export default {
    name: 'ListContacts',
    data() {
        return {
            contacts: [],
            testalluppercase: "test all uppercase",
            testcapitalize: "test capitalize",
            testconcat: "test concat"
        }
    },
    components: {
        
    },  
    filters: { // register filters
      concat
    },
    methods: {
        getAllContacts() {
          contactService.getContacts().then((response) => {
             this.contacts = response;
             // eslint-disable-next-line
             console.log(this.contacts);
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        }, 
        deleteContact(contact) {
          contactService.deleteContact(contact).then((response) => {
              // eslint-disable-next-line
              console.log(response);
              if(response) {
                this.deleteContactClientSide(contact.id);
                alert("Contact was removed");
              }
          }, error => {
              // eslint-disable-next-line
              console.error(error);
          });
        },
        deleteContactClientSide(id) {
          this.contacts.splice(this.contacts.findIndex(function(i){
              return i.id === id;
          }), 1);
        }, 
        getfirstMissingContactID() {
          return firstMissingID(this.contacts);
        }

    },
    mounted() {
        this.getAllContacts();
    },
}

</script>
