<template>
      <tbody>
        <tr v-for="project in projects" v-bind:key="project.id">
          <td>{{ project.id }}</td>

          <td><router-link :to="'/sonar-qube/projects/' + project.id">{{ project.name }}</router-link></td>

          <td>{{ project.bugs.length }}</td>

          <td>{{ project.codeSmells.length }}</td>

          <td>{{ project.debt.debt }}</td>

          <td>{{ project.coverage.coverage }}</td>

          <td>{{ project.unitTests.length }}</td>

          <td>{{ project.duplications.length }}</td>

          <td>{{ project.done }}</td>
        </tr>
      </tbody>
</template>

<script>

export default {
    name: 'ListProjects',
    props: {
        projects:{
            type: Array,
            required: true
        },
    },
}
</script>