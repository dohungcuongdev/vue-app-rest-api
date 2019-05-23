<template>
    <table class="table table-bordered table-hover" v-if="listData.length > 0">
        <table-header :headers="headers"></table-header>
        <table-body :listData="listData" :listProperties="listProperties"></table-body>
    </table>
</template>

<script>
import TableHeader from './TableHeader'
import TableBody from './TableBody'
export default {
    name: 'Table',
    props: {
        headers:{
            type: Array[String],
            required: true
        },
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
    components: {
        'table-header': TableHeader,
        'table-body': TableBody
    }
}
</script>