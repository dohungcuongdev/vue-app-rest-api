<template>
<table-pagination :listData="projects" :headers="headers" :listProperties="listProperties" :totalPages="totalPages" :routerPath="routerPath" @currentPageUpdated="currentPage=$event"></table-pagination>
</template>
<script>

import TablePagination from '@/components/common/TablePagination'

import {PROJECTS_HEADER} from '@/config/const'
import {PROJECTS_PROPERTIES} from '@/config/const'
export default {
    name: 'TableProjectsPagination',
        components: {
        'table-pagination': TablePagination
    },
    extends: {
        TablePagination
    },
    data() {
        return {
            headers: PROJECTS_HEADER,
            listProperties: PROJECTS_PROPERTIES,
            //listProperties: null,
            currentPage: Number,
        }
    },    
    props: {
        projects: {
          type: Array[Object],
          required: true
        },
        totalPages: {
          type: Number,
          required: true
        },
        routerPath: {
          type: String,
          required: true
        }
    },
    components: {
        'table-pagination': TablePagination,
    },
    mounted() {
        // eslint-disable-next-line
        console.log("TableProjectsPagination: mounted was called");

        this.$emit('currentPageUpdated', this.currentPage);
    },
}
</script>