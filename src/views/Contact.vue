<style scoped>
input:read-only {
  background-color: lightgray;
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
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td v-if="hasNoValue(contact.id)"><input type="id" ref="id" :value="$route.params.id"></td>
          <td v-else><input type="id" ref="id" :value="contact.id" readonly></td>

          <td><input type="first_name" ref="first_name" :value="contact.first_name"></td>

          <td><input type="last_name" ref="last_name" :value="contact.last_name"></td>

          <td><input type="email" ref="email" :value="contact.email"></td>

          <td><input type="phone" ref="phone" :value="contact.phone"></td>

          <td><input type="address" ref="address" v-bind:value="contact.address"></td>

          <td v-if="hasNoValue(contact.id)"><button @click.prevent="saveContact('add')">Add</button></td>
          <td v-else><button @click.prevent="saveContact('update')">Update</button></td>

          <td>
            <button class="btn btn-danger" @click="deleteContact(contact)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    </form>

    <router-link :to="{ path: '/contacts'}" replace v-if="this.$route.path !== '/contacts'">Go to Contacts page</router-link>
    <div></div>
  </div>
</template>

<script>
import {Contacts} from './Contacts'

import {ContactService} from '../services/contactservice'
const contactService = new ContactService(); //create new instance

import concat from '../filters/default/concat';

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
          contactService.getContactDataByID(this.$route.params.id).then((response) => {
             this.contact = response;
             // eslint-disable-next-line
             console.log(this.contact);
          }, error => {
              // eslint-disable-next-line
              console.log("No contact matched the ID, need to create");
              //this.contact = {};
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
            let newContact = {"id": i, "first_name": f, "last_name": l, "email": e, "phone": p, "address": a};
            if(action === 'add') {
                contactService.addContact(newContact).then((response) => {
                    if(response) {
                        alert("Contact was added");
                        this.$router.replace({ path: '/contacts' })
                        }
                    }, error => {
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
                        // eslint-disable-next-line
                        console.error(error);
                    });
            }
        },
        hasNoValue(obj) {
            return obj == null || obj === '';
        }
    },
    mounted() {
        this.getSingeContact();
    },
}

</script>
