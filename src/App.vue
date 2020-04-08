<template>
  <v-app>
    <v-app-bar
      app
    >
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created: function () {
    const storage = localStorage.getItem('todos')
    const todos = JSON.parse(storage)
    if (todos.length > 0) {
      this.getTodos(todos)
    }
  },
  methods: {
    ...mapActions(['getTodos'])
  }
};
</script>
<style lang="sass">
html
  overflow-y: auto !important
</style>
