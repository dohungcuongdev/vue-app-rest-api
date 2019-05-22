<template>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{header}}</th>
        </tr>
      </thead>
</template>

<script>
export default {
    name: 'TableHeader',
    props: {
        headers:{
            type: Array[String],
            required: true
        },
    }
}
</script>