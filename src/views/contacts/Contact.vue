<style scoped>
input:read-only {
  background-color: lightgray;
}

input.input-id {
  width: 30%;
}

td.input-id {
  width: 40%;
}
</style>

<template>
  <div>
    <h1>Contact {{$route.params.id}}</h1>
    <form>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th v-if="hasNoValue(contact.id)">Add</th>
          <th v-else>Update</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td v-if="hasNoValue(contact.id)"><input class="input-id" type="id" ref="id" :value="$route.params.id"></td>
          <td v-else><input class="input-id" type="id" ref="id" v-model="contact.id" readonly></td>

          <td><input type="first_name" ref="first_name" v-model="contact.first_name"></td>

          <td><input type="last_name" ref="last_name" v-model="contact.last_name"></td>

          <td><input type="email" ref="email" v-model="contact.email"></td>

          <td><input type="phone" ref="phone" v-model="contact.phone"></td>

          <td><input type="address" ref="address" v-model="contact.address"></td>

          <td v-if="hasNoValue(contact.id)"><button @click.prevent="saveContact('add')">Add</button></td>
          <td v-else><button @click.prevent="saveContact('update')">Update</button></td>
        </tr>
      </tbody>
    </table>
    </form>

    <router-link :to="{ path: '/contacts'}" replace v-if="this.$route.path !== '/contacts'">Go to Contacts page</router-link>
    <div></div>
  </div>
</template>

<script>
import Contacts from './Contacts.vue'

import {ContactService} from '@/services/contactservice'
const contactService = new ContactService(); //create new instance

import concat from '@/filters/default/concat';

export default {
    name: 'Contact',
    extends: Contacts,
    data() {
        return {
            contact: Object,
        }
    },
    methods: {
        getSingeContact() {
          // eslint-disable-next-line
          console.log(this.$route.params.id);
          contactService.getContactDataByID(this.$route.params.id).then((response) => {
             this.contact = response;
             // eslint-disable-next-line
             console.log(this.contact);
          }, error => {
              // eslint-disable-next-line
              console.log("No contact matched the ID, need to create");
              this.contact = {};

              // eslint-disable-next-line
              //console.error(error);
          });
        },
        saveContact(action) {
            let i = this.$route.params.id
            let f = this.$refs.first_name.value
            let l = this.$refs.last_name.value
            let e = this.$refs.email.value
            let p = this.$refs.phone.value
            let a = this.$refs.address.value
            if(this.hasNoValue(f) && this.hasNoValue(l)) {
                alert('First Name and Last Name are required')
                return false
            }
            if(this.hasNoValue(f)) {
                alert('First Name is required')
                return false;
            }
            if(this.hasNoValue(l)) {
                alert('Last Name is required')
                return false;
            }
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!((e == "")? false : (reg.test(e)) ? true : false)) {
              alert('Email is not valid');
              return false;
            }
            let newContact = {"id": i, "first_name": f, "last_name": l, "email": e, "phone": p, "address": a};
            if(action === 'add') {
                contactService.addContact(newContact).then((response) => {
                    if(response) {
                        alert("Contact was added");
                        this.$router.replace({ path: '/contacts' })
                      }
                    }, error => {
                        alert("Fail to add, Server response error " + error);
                        // eslint-disable-next-line
                        console.error(error);
                    });
            }
            if(action === 'update') { 
                contactService.editContact(newContact).then((response) => {
                    if(response) {
                        this.contact = newContact;
                        alert("Contact was edited");
                      }
                    }, error => {
                        alert("Fail to update, Server response error " + error);
                        // eslint-disable-next-line
                        console.error(error);
                    });
            }
        },
        hasNoValue(obj) {
            return obj == null || obj === '';
        },
    },
    mounted() {
      /* Called after the instance has been mounted, where el is replaced by the newly created vm.$el. If the root instance is mounted to an in-document element, vm.$el will also be in-document when mounted is called.
        Note that mounted does not guarantee that all child components have also been mounted. If you want to wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted:
        mounted: function () {
          this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
          })
        }*/
        this.testInherite();
        this.getSingeContact();
    },

    /* Fetching After Navigation
    When using this approach, we navigate and render the incoming component 
    immediately, and fetch data in the component's created hook. It gives us the 
    opportunity to display a loading state while the data is being fetched over the 
    network, and we can also handle loading differently for each view.
    Let's assume we have a Contact component that needs to fetch the data for a contact 
    based on $route.params.id:*/
    watch: { 
      // call again the method if the route changes
      '$route': 'getSingeContact' 
      /* without this code, after load the component and access the view by pressing
       address bar, the contact will be not changed, you can try to reproduce this
       problem in CustomerDetails Component
       */
    },
    destyoyed() {
      /*Called after a Vue instance has been destroyed. When this hook is called, 
      all directives of the Vue instance have been unbound,
      all event listeners have been removed, and all child Vue instances have also been destroyed.*/
    },
    errorCaptured() {
      /*Called when an error from any descendent component is captured. 
      The hook receives three arguments: the error, the component instance that triggered the error, 
      and a string containing information on where the error was captured. 
      The hook can return false to stop the error from propagating further*/
    }
}

</script>
