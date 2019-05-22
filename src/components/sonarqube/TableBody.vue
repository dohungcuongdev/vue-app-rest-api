<template>
      <tbody>
        <tr v-for="tableData in listData" v-bind:key="tableData">
          <td v-if="listProperties==null" v-for="value in tableData" :key="value">{{value.toString()}}</td>
          <td v-else v-for="property in listProperties" :key="property">{{getObjectValueByProperty(tableData,property)}}</td> -->
        </tr>
      </tbody>
</template>

<script>

export default {
    name: 'TableBody',
    props: {
        listData:{
          type: Array[Object],
          required: true
        },
        listProperties: {
          type: Array[String],
          required: false,
          default: null
        }
    },
    methods: {
      getObjectValueByProperty(tableData, property) {
        if(property === '')
          return tableData;
        return tableData[property];
      }
    }
}
</script>