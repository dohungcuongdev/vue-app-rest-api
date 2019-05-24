<template>
    <input v-logger type="text" id="container" v-model="testvhidden">
</template>

<script>

export default {
    name: 'ContactsChild',
    data() {
      return {
        testvhidden: "test v-hidden"
      }
    },
    methods: {

    },
    created() {
      this.$nextTrick = function() {
        console.log("ContactsChild: nextTrick in created was called");
      }
      console.log("ContactsChild: created was called");
    },
    beforeMount() {
      console.log("ContactsChild: beforeMount was called");
    },
    mounted() {
      this.$nextTrick = function() {
        console.log("ContactsChild: nextTrick in mounted was called");
      }
      console.log("ContactsChild: mounted was called");
    },
    beforeUpdate() {
      console.log("ContactsChild: beforeUpdate was called");
    },
    updated() {
      console.log("ContactsChild: updated was called");
    },
    activated() {
      console.log("ContactsChild: activated was called");
    },
    deactivated() {
      console.log("ContactsChild: deactivated was called");
    },
    beforeDestroy() {
      console.log("ContactsChild: beforeDestroy was called");
    },
    destroyed() {
      console.log("ContactsChild: destroyed was called");
    },
    errorCaptured() {
      console.log("ContactsChild: errorCaptured was called");
    },
}

</script>
