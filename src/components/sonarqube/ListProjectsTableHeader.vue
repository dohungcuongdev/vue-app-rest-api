<template>
      <table-header :headers="headers"></table-header>
</template>

<script>
import TableHeader from './TableHeader'
import {PROJECTS_HEADER} from '@/config/const'
export default {
    name: 'ListProjectsTableHeader',
    components: {
        "table-header" :TableHeader
    },
    data() {
      return {
        headers: PROJECTS_HEADER
      }
    }
}
</script>