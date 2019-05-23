<template>
      <tbody>
        <tr v-for="(tableData,i) in listData" v-bind:key="i">
          <template v-if="listProperties==null"><td  v-for="(value,index) in tableData" :key="index">{{value}}</td></template>
          <td v-else v-for="(property,index) in listProperties" :key="index">{{getObjectValueByProperty(tableData, property)}}</td>
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
        let value = tableData;
        let subProperties = property.split(".");
        for(let i = 0; i < subProperties.length; i++) {
          value = value[subProperties[i]];
        }
        return value;
      }
    }
}
</script>